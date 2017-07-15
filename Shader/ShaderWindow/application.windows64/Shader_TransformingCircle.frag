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
    vec3 c;
    float l, z = u_time;

    for(int i = 0; i<3; i++){
        vec2 uv, st = gl_FragCoord.xy/u_resolution;
        uv = st;
        st -= .5;
        z += .07;
        l = length(st);
        // uv += st/l * (sin(z) + 1.) * abs(sin(l*9. - z * 2.));
        uv = st;
        // c[i] = .01/length(abs(mod(uv,1.)));
        c[i] = .01/length(abs(mod(uv, 1.)));
    }

	// vec2 st = gl_FragCoord.xy/u_resolution;

    // float y = st.x;

    // vec3 color = vec3(y);
    
    // // Plot a line
    // float pct = plot(st,y);
    // color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    
	gl_FragColor = vec4(c/l, u_time);
}