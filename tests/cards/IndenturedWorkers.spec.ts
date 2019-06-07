
import { expect } from "chai";
import { IndenturedWorkers } from "../../src/cards/IndenturedWorkers";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("IndenturedWorkers", function () {
    it("Should apply card discount until next card played", function () {
        const card = new IndenturedWorkers();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        const action = card.play(player, game);
        expect(action).to.eq(undefined);
        expect(player.victoryPoints).to.eq(-1);
        expect(player.cardDiscounts.length).to.eq(1);
        expect(player.cardDiscounts[0](card)).to.eq(0);
    });
});
