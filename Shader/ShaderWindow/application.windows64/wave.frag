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
    //To get this math, you need to find the function based on 4 point value for this function.
    return  (b-a)*u.x + (c-a) * u.y +(d+a-c-b)*u.x*u.y + a;
}
float pcurve( float x, float a, float b ){
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse/ u_resolution;
    st -= vec2(.5);
    st = st*10;
    vec3 back = vec3(0.);
    vec3 color_0 = vec3(1.);
    vec3 color_1 = vec3(.5,.3,.7);
    vec3 color_2 = vec3(.3,.7,.7);

    float image_1 = .7*noise(st - vec2(.7)*u_time);
    float image_2 = .5*noise(st + vec2(.3)*u_time);

    float image = step(.25 * sin(u_time)+.5,image_1+image_2);
    image = floor(3*(image_1+image_2) + .25 * sin(u_time))/3.;
    vec3 color = color_0;
    gl_FragColor = vec4(mix(back, color, image), 1.0);
}