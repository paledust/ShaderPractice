#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
  return fract(sin(dot(st,vec2(14.133,77.)))*312554.);
}
float random(float y){
    return random(vec2(y));
}

float plot(vec2 st, float pct){
  return  step(0.4, smoothstep( pct-0.05, pct, st.y) - 
          smoothstep( pct, pct + 0.05, st.y));
}

float DrawShape(vec2 st, float pct){
    return  smoothstep(0., abs(pct), st.y);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

// To create convincible wave, we need at least two wave passing through each otherto create wavy and trasforming shape
void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    st -= vec2(.5);
    vec2 st_2 = st;
    st = st*10;

    vec3 back = vec3(1.,.3,.4);
    vec3 lineColor = vec3(1.,.7,.3);
    float r = floor(st.x );
    float r_2 = floor(st.x + .8*u_time);
    float delt = fract(st.x );
    float delt_2 = fract(st.x + .8*u_time);
    float y_1 = mix(random(2.*r), random(2.*r+2.), smoothstep(0.,1.,delt));
    float y_2 = mix(random(1.*r_2), random(1.*r_2+1.), smoothstep(0.,1.,delt_2));

    float line = DrawShape(st, (.5*y_2+2*y_1)-1.);
    // float line_2 = plot(st, mix(3*random(r), 3*random(r+1.), smoothstep(0.,1.,delt)));
    // float line = line_1+line_2;

    gl_FragColor = vec4(mix(back, lineColor, line), 1.0);
}