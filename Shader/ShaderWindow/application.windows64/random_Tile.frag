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

float DrawTile(int Area, vec2 st){
    if(Area == 0)
      return step(1-st.x,st.y);
    if(Area == 1){
      return step(st.x, st.y);
    }
    if(Area == 2){
      return step(st.y,1-st.x);
    }
    if(Area == 3){
      return step(st.y,st.x);
    }
    return step(st.x,st.y);
}

float DrawCircle(vec2 ori, vec2 st){
    return step(length(st-ori),.6) - step(length(st-ori),.4);
}

vec2 TurchetPattern(in vec2 st, float index){
    if(index > .75)
        return vec2(st.x,st.y);
    else if(index > .5)
        return vec2(1-st.x,st.y);
    else if(index > .25)
        return vec2(1-st.x,1-st.y);
    else
        return vec2(st.x,1-st.y);
}

float random(vec2 st){
    return fract(sin(dot(st,vec2(14.133,77.)))*312554.);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 background = vec3(1.0);
    vec3 tileColor = vec3(.1);
    float gap = 10.0;
    float threashold = u_mouse.x;


    vec2 tile = TurchetPattern(fract(gap*st), random(floor(gap*st)));
    float draw = DrawCircle(vec2(0.0),tile) + DrawCircle(vec2(1.0),tile);
    draw = DrawTile(0,tile);

	gl_FragColor = vec4(mix(background,tileColor,draw), 1.0);
}