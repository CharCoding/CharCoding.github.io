unsigned long lcg_state = 0;

void __attribute__((used)) seed(double s) {
        lcg_state = (unsigned long)s;
}

inline unsigned long rng() {
        return lcg_state = lcg_state * 0x7facc0f7a00541bd + 0x98a93b6eea91ef4b;
}

double __attribute__((used)) rand53() {
        return (double)(rng() >> 11) * 0x1.p-53;
}

