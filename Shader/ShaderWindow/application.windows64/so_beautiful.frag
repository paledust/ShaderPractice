
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define OCTAVES 6

float random2(in vec2 st){
    st = vec2(dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    vec2 r = fract(sin(st)*43758.5453123);
    return r.x*r.y;
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random2(vec2(i));
    float b = random2(vec2(i) + vec2(1.0, 0.0));
    float c = random2(vec2(i) + vec2(0.0, 1.0));
    float d = random2(vec2(i) + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;;
}

float fbm(in vec2 st){
    float value = 0.0;
    float amplitud = 1.;
    vec2 shift = vec2(100.0);
    float frequency = 0.;

    mat2 rot = mat2(cos(.5), sin(.5),
                    -sin(.5), cos(.5));

    for (int i = 0; i < OCTAVES; i++) {
        value += amplitud * noise(st + frequency*u_time);
        st = rot * st * 2. + shift;
        amplitud *= .5;
    }

    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    st *= 3.;

    vec2 q = vec2(0.);
    q.x = fbm(st + 0.00*u_time);
    q.y = fbm(st + vec2(1.));

    vec2 r = vec2(0.);
    r.x = fbm(st + .3*q + vec2(1.7,9.2) + .15*u_time);
    r.y = fbm( st + .3*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fbm(st + r);
    color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.666667,1,1),
                clamp(length(r.x * r.y * r.y),0.0,1.0));
    gl_FragColor = vec4(color,1.0);
}