class CPU {
  constructor(renderer, keyboard, speaker) {
    this.renderer = renderer;
    this.keyboard = keyboard;
    this.speaker = speaker;

    // 4KB (4096 bytes) of memory
    this.memory = new Uint8Array(4096);

    // 16 8-bit registers
    this.v = new Uint8Array(16);

    // Stores memory addresses. Set this to 0 since we aren't storing anything at initialization.
    this.i = 0;

    // Timers
    this.delayTimer = 0;
    this.soundTimer = 0;

    // Program counter. Stores the currently executing address.
    this.pc = 0x200;

    // Don't initialize this with a size in order to avoid empty results.
    this.stack = new Array();

    // Some instructions require pausing, such as Fx0A.
    this.paused = false;

    this.speed = 10;
  }
}

loadSpritesIntoMemory() {
    // Array of hex values for each sprite. Each sprite is 5 bytes.
    // The technical reference provides us with each one of these values.
    const sprites = [
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80  // F
    ];

    // According to the technical reference, sprites are stored in the interpreter section of memory starting at hex 0x000
    for (let i = 0; i < sprites.length; i++) {
        this.memory[i] = sprites[i];
    }
}

loadProgramIntoMemory(program) {
    for (let loc = 0; loc < program.length; loc++) {
        this.memory[0x200 + loc] = program[loc];
    }
}

loadRom(romName) {
    var request = new XMLHttpRequest;
    var self = this;

    // Handles the response received from sending (request.send()) our request
    request.onload = function() {
        // If the request response has content
        if (request.response) {
            // Store the contents of the response in an 8-bit array
            let program = new Uint8Array(request.response);

            // Load the ROM/program into memory
            self.loadProgramIntoMemory(program);
        }
    }

    // Initialize a GET request to retrieve the ROM from our roms folder
    request.open('GET', 'roms/' + romName);
    request.responseType = 'arraybuffer';

    // Send the GET request
    request.send();
}

cycle() {
    for (let i = 0; i < this.speed; i++) {
        if (!this.paused) {

        }
    }
}

export default CPU;
