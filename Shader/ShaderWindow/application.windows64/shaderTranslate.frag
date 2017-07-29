#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

float box(in vec2 _st, in vec2 _size){
  _size = vec2(0.5) - _size*0.5;
  vec2 uv = smoothstep(_size,
                      _size+vec2(0.001),
                      _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
  return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
  return  box(_st, vec2(_size,_size/4.)) + 
            box(_st, vec2(_size/4.,_size));
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
  return mat2(_scale.x, 0.0,
              0.0, _scale.y);
}

void main() {
  vec3 color = vec3(0.0);
  vec2 st = gl_FragCoord.xy / u_resolution;
  st = st - vec2(.5);

  // st = rotate2d(sin(u_time) * M_PI) * st;
  st = scale(vec2(sin(u_time)+ 1.0)) * st;
  vec2 translate = vec2(sin(u_time), cos(u_time));
  // st += translate * 0.35;
  st += vec2(.5);
  color = vec3(cross(st,0.2));
  gl_FragColor = vec4(color,1.0);
}