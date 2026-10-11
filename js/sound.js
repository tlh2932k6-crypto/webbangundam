/**
 * MECHA CORE - SOUND ENGINE
 * Âm thanh tương tác đã được vô hiệu hóa hoàn toàn theo yêu cầu.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = false;
    try {
      localStorage.setItem("mecha_sound_enabled", "false");
    } catch (e) {}
  }

  init() {}
  toggle() { return false; }
  playHover() {}
  playClick() {}
  playAddToCart() {}
  playSuccess() {}
  playError() {}
  playBeep() {}
}

const mechaSound = new SoundEngine();
