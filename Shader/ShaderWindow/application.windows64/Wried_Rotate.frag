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
    //To get this math, you need to find the function based on 4 point value for this function.
    return  (b-a)*u.x + (c-a) * u.y +(d+a-c-b)*u.x*u.y + a;
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

float Circle(vec2 st, float radius){
    return step(length(st), radius);
}

float DrawBoard(vec2 st, float radius, float width){
    // return shape(st, radius);
    return Circle(st, radius) - Circle(st, radius - width);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse/ u_resolution;
    st -= vec2(.5);
    st = st*10;
    st = rotate2d(noise(st) + u_time) * st;
    vec2 coord = vec2(length(st), (atan(st.y, st.x)+M_PI)/(2*M_PI));
    float circle = DrawBoard(st, 4.0, .1);
    circle += shape(st, 2.);

    vec3 back = vec3(1.);
    vec3 color_0 = vec3(0.);
    vec3 color = color_0;

    gl_FragColor = vec4(mix(back, color, circle), 1.0);
}