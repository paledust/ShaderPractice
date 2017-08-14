#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 Red = vec3(.7, 0.,0.1);
vec3 Blue = vec3(0.,0.36,.55);
vec3 Yellow = vec3(.95,.75,0.5);

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  step(0.4, smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct + 0.02, st.y));
}

float Rect(float x1, float x2, float y1, float y2, vec2 st){
  vec2 rect_1 = smoothstep(vec2(x1-0.02, y1-0.02), vec2(x1,y1), st);
  vec2 rect_2 = smoothstep(vec2(1.0 - x2,1.0 - y2),vec2(1.0 - x2+0.02, 1.0 - y2+0.02), 1.0 - st);
  
  rect_1 = floor(vec2(st.x + 1.0 - x1,st.y + 1.0 - y1));
  rect_2 = -floor(vec2(st.x - x2 , st.y - y2));

  // vec2 rect_2 = -floor(vec2(x1));

  vec2 rect = rect_1 * rect_2;
  return rect.x * rect.y;
}

float Cross(in vec2 st, float size){
  float rect_1 = Rect(size, 1-size,
                      4 * size, (1-4*size), st);
  float rect_2 = Rect(4*size, (1-4*size),
                      size,(1-size), st);
  return rect_1 + rect_2;
}

float Circle(vec2 center, float radius, in vec2 st){
  
  return (1 - step(radius, distance(st, center)));
}

float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 background = vec3(0.0);
  vec3 color_1 = vec3(.1,.2,.3);
  vec3 color_2 = vec3(.3,.2,.1);
  vec3 color_3 = vec3(.2,.3,.1);
  vec3 color = vec3(0.0);
  int gap = 100;
  vec2 stVector = 2*step(vec2(1.0),mod(gap * st,vec2(2.0))) - 1;
  
  st = fract(gap * st);
  float MoveVector = step(1.0,mod(u_time, 2.0));
  vec2 translate = vec2(u_time * MoveVector * stVector.y, stVector.x * u_time * (1 - MoveVector));
  st += translate * 1.0;
  vec2 pause = floor(st);
  float draw = Circle(vec2(.5) + pause, .25, st);
  
  color = mix(color_1,color_2, sin(u_time));
  color = mix(color_3,color,cos(u_time));
  // background = vec3(st, 0.0);
	gl_FragColor = vec4(mix(background,color,draw), 1.0);
}