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

float Circle(vec2 center, float radius, vec2 st){
  return (1 - step(radius, distance(st, vec2(0.5))));
}

float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 background = vec3(1.);
  vec3 Fin_Color = vec3(.0);

  st = 2*st - 1;
  float a = atan(st.y, st.x);
  float d = cos(floor(a*.636 + .5 ) * M_PI/2. ) ;
  Fin_Color = vec3(d);
	gl_FragColor = vec4(Fin_Color, 1.0);
}