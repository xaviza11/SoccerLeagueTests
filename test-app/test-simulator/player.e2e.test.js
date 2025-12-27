const { SIMULATOR_URL } = require('../config');

async function generatePlayer(position, target_avr) {
    const res = await fetch(`${SIMULATOR_URL}/player/generate?position=${position}&target_avr=${target_avr}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}


describe("Simulator Player Tests", () => {

    it("should create a player with valid position and target", async () => {
        const player = await generatePlayer('Defender', 55);
        expect(player).toHaveProperty('position', 'Defender');
        expect(player.max_skill_level).toBeGreaterThanOrEqual(0);
    });

    it("should return error when invalid position", async () => {
        await expect(generatePlayer('defender', 99)).rejects.toThrow();
    });

    it("should return error when try to create one player whit more than 85 of skills average", async () => {
        await expect(generatePlayer('Defender', 86)).rejects.toThrow();
    })

});
