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

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec3 background = vec3(1.,.95,.9);
  vec3 Line_Color = vec3(0.0);

  float draw_Line = plot(st, 0.8) + 
                    plot(st, 0.6) + 
                    plot(st, 0.1) * step(0.2, st.x) +
                    plot(vec2(st.y, st.x), 0.1) * step(0.6, st.y) +
                    plot(vec2(st.y, st.x), 0.2) + 
                    plot(vec2(st.y, st.x), 0.7) + 
                    plot(vec2(st.y, st.x), 0.96);

  vec3 FinalColor = background;
  FinalColor = mix(FinalColor, Red, Rect(0., .2, .6, 1., st));
  FinalColor = mix(FinalColor, Yellow, Rect(0.96, 1., .6, 1., st));
  FinalColor = mix(FinalColor, Blue, Rect(.7, 1., 0., .1, st));
  FinalColor = mix(FinalColor, Line_Color, draw_Line);
	gl_FragColor = vec4(FinalColor, 1.0);
}