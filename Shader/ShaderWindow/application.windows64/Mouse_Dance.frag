#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
  vec2 m = normalize(u_mouse);
  vec2 st = gl_FragCoord.xy / u_resolution;


  vec3 color_a = vec3(0.,st.x,st.y);
  vec3 color_b = vec3(st.x,st.y,0.);

  vec3 color_x = mix(color_a,color_b, sin(m.x));
  vec3 color_y = mix(color_a,color_b, sin(m.y));
    
	gl_FragColor = vec4(mix(color_x,color_y, sin(u_time)), 1.0);
}