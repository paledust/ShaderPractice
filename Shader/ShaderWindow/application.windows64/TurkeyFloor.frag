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

float DrawTile(int Area, vec2 st){
  if(Area == 0)
    return step(1-st.x,st.y);
  if(Area == 1){
    return step(st.x, st.y);
  }
  if(Area == 2){
    return step(st.y,1-st.x);
  }
  if(Area == 3){
    return step(st.y,st.x);
  }

  return step(st.x,st.y);
}

bool IF_EVEN(float num){
  num = floor(num);
  return mod(num,2.0) == 0.0;
}

int Lay(vec2 st){
  if(IF_EVEN(st.x) && IF_EVEN(st.y)){
    return 1;
  }
  if(IF_EVEN(st.x) && !IF_EVEN(st.y)){
    return 0;
  }
  if(!IF_EVEN(st.x) && IF_EVEN(st.y)){
    return 2;
  }
  if(!IF_EVEN(st.x) && !IF_EVEN(st.y)){
    return 3;
  }
  return 0;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 background = vec3(1.0);
  vec3 tileColor = vec3(.1);
  int gap = 10;
  int tile = 0;
  tile = Lay(gap * st);
  st = fract(gap * st);
  float tileDraw = DrawTile(tile,st);
	gl_FragColor = vec4(mix(background,tileColor,tileDraw), 1.0);
}