#ifdef GL_ES
precision mediump float;
#endif
#define M_PI 3.1415926535897932384626433832795
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
  return fract(sin(dot(st,vec2(14.133,77.)))*312554.);
}
float random(float y){
    return random(vec2(y));
}

float shape(vec2 st, float radius){
    float r = floor(100*st.y + u_time);
    float r_2 = floor(100*st.y - u_time);
    float delt = fract(100*st.y + u_time);
    float delt_2 = fract(100*st.y - u_time);

    float y_1 = mix(random(r), random(r+1.), smoothstep(0.,1.,delt));
    float y_2 = mix(1.2*random(r_2+10.), 1.2*random(r_2+11.), smoothstep(0.,1.,delt_2));

    float y = (y_1 + y_2)/2.;

    return step(y+st.x, radius);
}

float DrawBoard(vec2 st, float radius, float width){
    // return shape(st, radius);
    return shape(st, radius) - shape(st, radius - width);
}

float Circle(vec2 st, float radius){
    return step(length(st), radius);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse/ u_resolution;
    st -= vec2(.5);
    st = st*10;
    vec2 coord = vec2(length(st), (atan(st.y, st.x)+M_PI)/(2*M_PI));
    // coord.y *= 10;
    float circle = DrawBoard(coord, 4.0, .1);

    vec3 back = vec3(1.);
    vec3 color_0 = vec3(0.);
    vec3 color = color_0;

    gl_FragColor = vec4(mix(back, color, circle), 1.0);
}