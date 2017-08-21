
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return fract(sin(st)*43758.5453123);
}

float DrawCirclr(vec2 st, vec2 origin, float Radius){
    return step(Radius, distance(st,origin));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution.xy;
    mouse.y = -mouse.y + 1.;

    st *= 3.;
    mouse *= 3.;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    float m_dist = 1.0;

    for(int y = -1; y<=1; y++){
        for(int x = -1; x<=1; x++){
            vec2 neighboor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighboor);
            point = .5 + .5*sin(u_time * 3.14 + point * 6.2831);
            vec2 diff = point - f_st + neighboor;
            float dist = length(diff);
            m_dist *= min(1,dist);
        }
    }

    // m_dist = min(m_dist, distance(st, mouse));

    vec3 color = vec3(0.0);
    color += step(.07, m_dist);
    // color += 1.0 - step(.02, m_dist);
    // color.r += step(.98, f_st.x) + step(.98, f_st.y);
    gl_FragColor = vec4(color,1.0);
}