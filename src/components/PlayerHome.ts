
import Vue from "vue";

import { Board } from "./Board";
import { Card } from "./Card";
import { ClaimedMilestone } from "./ClaimedMilestone";
import { FundedAward } from "./FundedAward";
import { OtherPlayer } from "./OtherPlayer";
import { PlayerResources } from "./PlayerResources";
import { WaitingFor } from "./WaitingFor";

export const PlayerHome = Vue.component("player-home", {
    props: ["player"],
    components: {
        "board": Board,
        "card": Card,
        "claimed-milestone": ClaimedMilestone,
        "funded-award": FundedAward,
        "other-player": OtherPlayer,
        "player-resources": PlayerResources,
        "waiting-for": WaitingFor
    },
    data: function () {
        return {}
    },
    template: `
        <div id="player-home">
            <h1 :style="'color:' + player.color">Teraforming Mars - Player Home - {{player.name}}</h1>
            <div v-if="player.corporationCard">
                <div>Generation: {{player.generation}}</div>
                <div>Terraform Rating: {{player.terraformRating}}</div>
                <h2>Corporation Card</h2>
                <card :card="player.corporationCard"></card>
                <div v-if="player.playedCards.length > 0">
                    <h2>Played Cards</h2>
                    <div v-for="card in player.playedCards" :key="card.name">
                        <card :card="card.name" :animals="card.animals" :fighterResources="card.fighterResources" :microbes="card.microbes" :scienceResources="card.scienceResources"></card>
                    </div>
                </div>
                <div v-if="player.cardsInHand.length > 0">
                    <h2>Cards In Hand</h2>
                    <div v-for="card in player.cardsInHand" :key="card.name">
                        <card :card="card.name" :animals="card.animals" :fighterResources="card.fighterResources" :microbes="card.microbes" :scienceResources="card.scienceResources"></card>
                    </div>
                </div>
                <h2>Resources</h2>
                <player-resources :player="player"></player-resources>
                <h2>Oxygen Level ({{player.oxygenLevel}})</h2>
                <div>
                    <progress class="nes-progress is-success" max="14" :value="player.oxygenLevel"></progress>
                </div>
                <h2>Temperature ({{player.temperature}})</h2>
                <div>
                    <progress class="nes-progress is-warning" max="38" :value="player.temperature + 30"></progress>
                </div>
                <h2>Oceans ({{player.oceans}})</h2>
                <div>
                    <progress class="nes-progress is-primary" max="9" :value="player.oceans"></progress>
                </div>
                <h2>Board</h2>
                <board :spaces="player.spaces"></board>
                <div v-if="player.claimedMilestones.length > 0">
                    <h2>Claimed Milestones</h2> 
                    <claimed-milestone v-for="claimedMilestone in player.claimedMilestones" :key="claimedMilestone.milestone" :players="player.players" :claimedmilestone="claimedMilestone"></claimed-milestone>
                </div>
                <div v-if="player.fundedAwards.length > 0">
                    <h2>Funded Awards</h2>
                    <funded-award v-for="fundedAward in player.fundedAwards" :key="fundedAward.award" :players="player.players" :fundedaward="fundedAward"></funded-award>
                </div>
                <div v-if="player.players.length > 1">
                    <h2>Other Players</h2>
                    <div v-for="otherPlayer in player.players" :key="otherPlayer.id">
                        <other-player v-if="otherPlayer.id !== player.id" :player="otherPlayer">
                        </other-player>
                    </div>
                </div>
            </div>
            <waiting-for :players="player.players" :waitingfor="player.waitingFor"></waiting-for>
        </div>
    `
});