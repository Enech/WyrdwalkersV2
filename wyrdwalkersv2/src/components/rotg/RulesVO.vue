<template>
  <div>
    <v-card class="pa-3 text-justify" id="app-content-custom">
      <v-card-title class="headline">Rise of the Gods - Rules</v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-tabs v-model="tabs">
        <v-tab>The Game</v-tab>
        <v-tab>Appendices</v-tab>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <div class="panel panel-default mt-3" id="introduction">
              <div class="panel-heading">
                <h3 class="panel-title uppercase font-weight-light title">Presentation</h3>
              </div>
              <div class="panel-body">
                <p>
                  Hello powerful deity and welcome to 
                  <i>Rise of the Gods</i> !
                  <br />This turn by turn browser game is a game that is both competitive and collaborative where you will be playing one of the 12 Pantheons of the Wyrdwalkers Universe. You can play with up to 11 other people to conquer the Cosmos during the legendary events of the Second Titanomachy. Each day you will send your instructions through an
                  <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheet. With these orders, you will be able to advance towards the common objective of defeating the Titans but also to carve out a piece of the cake larger than those of your rivals.
                </p>
                <bloc-1>
                  <titre>Background</titre>
                  <content>
                    <p>
                      We are around -1200 BC. Zeus rose against his father Kronus, who became the Titan of Control and Civilization. Leading the Gods against the Titans, the young Greek God has managed to free his siblings and wage a bitter war to drive back the enemies of humanity.
                      <br />While Zeus has locked Kronus in Tartarus after a battle that shook the foundations of the Cosmos and the war is coming to an end, it is time to defeat the last Titanic strongholds and prepare for the new universe that will emerge. In this war, you incarnate the leader of a Pantheon of Gods and your objective is to obtain a primordial place in the new emerging Cosmic Order.
                    </p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Game Objectives</titre>
                  <content>
                    <p>
                      The objective of the game is to get a maximum of
                      <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points in 7 Game Turns. These points are obtained by conquering the 
                      <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes occupied by the Titans. To conquer these busy plans, you will need to spend your resources wisely through orders compiled into an
                      <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheet. It will especially be necessary to consult with the other players so that your scarce resources are spent judiciously!
                    </p>
                    <span>
                      There are two types of victory in 
                      <i>Rise of the Gods</i> :
                    </span>
                    <ul>
                      <li>
                        Global Victory : at the end of Turn 7, the Gods must control a number of 
                        <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes based on the number of players. You will find details in the Appendices.
                      </li>
                      <li>
                        Invididual Victory : whether or not the Gods win the war of conquest against the Titans, the Pantheons need to unite behind a leader to rebuild the Cosmos. You become this leader if at the end of Turn 7 you are the player with the most
                        <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points
                      </li>
                    </ul>
                    <p></p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Types of Games</titre>
                  <content>
                    <p>
                      <i>Rise of the Gods</i> can be played in two different modes. The rules and gameplay remain the same, only the game speed changes.
                      <br />(
                      <b>Please note that a game cannot change game mode once launched!</b>)
                    </p>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-check</v-icon>&nbsp;
                          <strong>
                          
                            <b>Board Game Mode</b>
                          </strong>
                        </div>
                        <p>The ends of turns are triggered manually and the result is given immediately. It is the ideal game mode if you want to have a quick game with friends like a board game. (Estimated playing time for 4 players: ~ 1h30).</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-check</v-icon>&nbsp;
                          <strong>
                            
                            <b>Timer Mode</b>
                          </strong>
                        </div>
                        <p>Timer mode: The calculation of turns is triggered automatically every day between 10 p.m. and 11 p.m. GMT. Ideal for a game spread over time.</p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Starting a Game</titre>
                  <content>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Game Creation</strong>
                        </div>
                        <p>From the list of games, you can create your personalized game. Give it a name (or take a randomly generated one) and choose a game mode.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Choose your Pantheon</strong>
                        </div>
                        <p>
                          Once on the interface of your game, click on the &nbsp;
                          <v-icon>fa-dungeon</v-icon>&nbsp; symbol to register for the game by choosing the Pantheon you wish to embody. All players wishing to participate in the game must choose a Pantheon before game launch.
                          <br />
                          <b>It is impossible to join a game in progress once launched.</b>
                          <br />
                          <b>The Pantheon you choose has no mechanical influence on the game.</b>
                        </p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Game Launch</strong>
                        </div>
                        <p>
                          Once all the players are present, click on the &nbsp;
                          <v-icon>play_arrow</v-icon>&nbsp; symbol to start the game.
                        </p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>A Game Turn</titre>
                  <content>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Filling out an Sending Orders</strong>
                        </div>
                        <p>
                          For each resource is available a list of orders from which you must choose a maximum of one each turn.
                          <u>Click on the "Confirm" button</u> of each order you choose for each resource. When a resource already has a validated order, its icon turns green on the
                          <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheet. Once done, send your file by pressing the button "Send my Order Sheet".
                          <b>The sending of your form is final, remember to check that your orders are confirmed before sending your sheet.</b>
                        </p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Launch/Wait for the end of the turn</strong>
                        </div>Depending on your game mode, wait for the programmed turn end or launch it by clocking the button
                        <v-icon>alarm_on</v-icon>.
                        <br />Sent orders are processed in the following manner (See Appendices for detailed resolving)
                        <ul>
                          <li>Hand of Fate applies (see below)</li>
                          <li>Non-conquest-related orders are processed</li>
                          <li>Conquests are resolved</li>
                          <li>Resolution of bets made on attacks.</li>
                          <li>
                            Increase of Titanic Forces in the 
                            <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes still held by the Titans after conquests are resolved.
                          </li>
                          <li>The resources of all players are increased as indicated in the Appendices.</li>
                          <li>If last round: Checking of the overall victory conditions.</li>
                        </ul>
                        <p></p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-circle</v-icon>&nbsp;
                          <strong>Fate Consequences</strong>
                        </div>
                        <p>
                          Once the round has been processed, a window will appear to show you the relevant information for the past round: the attacks that have been launched, the bonuses you enjoy for the next round, the resources you have gained and / or lost and ... a Fate Consequence. Automatically after each turn, a Fate Consequence will be randomly assigned to you among the 8 possible. Four of them are neutral and the other four will be more or less detrimental to you depending on the number of
                          <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings that you will have accumulated at the end of the turn.
                          <br />Details of the possible Fate Consequences can be found in the Appendices.
                        </p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
              </div>
            </div>
            <div class="panel panel-default" id="introduction">
              <div class="panel-heading">
                <h3 class="panel-title uppercase font-weight-light title">Game Characteristics</h3>
              </div>
              <div class="panel-body">
                <bloc-1>
                  <titre>Terminology</titre>
                  <content>
                    <p>
                      In <i>Rise of the Gods</i> certain terms are borrowed directly from the roleplaying universe. In particular, you will see a lot of "1D6", "2D3" etc. If you are already familiar with these terms, you can skip this paragraph. Otherwise, here are some explanations.<br>
                      <br>
                      Very simply, a D6 represents a 6-sided die. The results of 1D6 therefore represent a roll of a 6-sided die and can therefore vary randomly between 1 and 6. Likewise, 2D6 represents a roll of two 6-sided dice and the results vary randomly between 2 and 12. <br >
                      Following this same principle, 1D3 gives results between 1 and 3, 1D4 gives results between 1 and 4 and 1D10 gives results between 1 and 10.
                    </p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Ressources</titre>
                  <content>
                    <p>
                      In 
                      <i>Rise of the Gods</i> you will need to strategically manage 6 different resources, each bringing different advantages which you will need to take advantage of depending on the situation:
                    </p>
                    <ul class="fa-ul">
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-gem</v-icon>&nbsp;
                          <strong>Orichalcum</strong>
                        </div>
                        <p>The currency of the Gods and therefore the fuel of the war. This resource is versatile and allows you to adapt quickly to all situations.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-fist-raised</v-icon>&nbsp;
                          <strong>Army</strong>
                        </div>
                        <p>
                          Your troops on the battlefield and therefore the source of all your attacks. It is mainly thanks to this resource that you will be able to win the 
                          <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points necessary to win the game.
                        </p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-jedi</v-icon>&nbsp;
                          <strong>Heroism</strong>
                        </div>
                        <p>This resource gives you the opportunity to turn things around, change your strategy along the way and deal with the unexpected.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-eye</v-icon>&nbsp;
                          <strong>Prophets</strong>
                        </div>
                        <p>The resource that allows you to observe behind the scenes of the war by deciphering the mysteries of the future, spying on your allies or allowing you to learn about the situation of the Titans.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-user-friends</v-icon>&nbsp;
                          <strong>Population</strong>
                        </div>
                        <p>These are humans of all stripes and magical creatures under the influence of your Pantheon. This resource is like a raw material that will allow you to stabilize your power.</p>
                      </li>
                      <li>
                        <div class="list-title">
                          <v-icon small left>fa-spider</v-icon>&nbsp;
                          <strong>Fate Bindings</strong>
                        </div>
                        <p>The extent of your involvement in the Cosmos. As you create your Legend you disrupt the plans of Fate and Fate doesn't like that. Unlike other resources, it is advisable not to climb it too high, or the Fate Consequences that you undergo each turn may well put you out of the game with the unexpected passage of a dragon stealing your money and killing your population ...</p>
                      </li>
                    </ul>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>
                    The 
                    <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes
                  </titre>
                  <content>
                    Each game includes 10
                    <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes. At launch, each of them is in the hands of the Titans. The objective of the players is to control, if not the most numerous, at least the most strategic depending on the situation of the game. Each Plane has a number of Titanic forces that the Gods - so you, the players - will have to surpass in order to conquer it. At the start, each Plane begins with
                    <b>1D3 + 2</b> Titanic forces. Then these forces increase as the turns and conquests carried out by the players progress, until the Plane is conquered.
                    <ul>
                      <li>
                        <b>A conquered Plane, unless there is an event to the contrary, cannot return to the hands of the Titans and generally cannot change owner.</b>
                      </li>
                      <li>
                        <b>In general, the Titanic forces present on the Planes controlled by the Titans are not visible to the Gods. Only the appropriate orders can grant you access to this information for a turn.</b>
                      </li>
                      <li>
                        <b>Each Plane is associated with a resource. Details are in the Appendices.</b>
                      </li>
                    </ul>
                    <p></p>
                  </content>
                </bloc-1>
                <bloc-1>
                  <titre>Orders</titre>
                  <content>
                    <p>
                      Each resource has a specific order list. Each turn, a player can choose a maximum of one order for each resource. There is also an additional order, associated with no resource: the 
                      <v-icon small>fa-bolt</v-icon>&nbsp;Hand of Fate.
                      <br />
                      <br />For example, the resource 
                      <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum is associated with 4 different orders: Prosperity, Opulence, Investment and Anticipation. In each round, you can choose at most one of them to send in your
                      <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheet (as long as you have enough resources). The same goes for all other resources.
                      <br />
                      <br />To send an 
                      <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheet, you must confirm at least a single order for your entire sheet. If you don't send an 
                      <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheet for the current turn, no action will be taken in your name and you will have passed your turn (your income will still be allocated to you).
                    </p>
                  </content>
                </bloc-1>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-3" outlined>
                  <v-card-title>Available Pantheons</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Aesir</td>
                            <td>The Viking gods. Determined, combative, courageous but impulsive and cursed by Fate</td>
                          </tr>
                          <tr>
                            <td>Amatsukami</td>
                            <td>Japanese gods. United, proud of their traditions and focused on diplomacy to achieve their goals</td>
                          </tr>
                          <tr>
                            <td>Ayllus</td>
                            <td>The Inca gods. Wise and caring but still very young</td>
                          </tr>
                          <tr>
                            <td>Celestial Bureaucracy</td>
                            <td>The Chinese gods. Organized, efficient and merciless against both the Titans and Fate</td>
                          </tr>
                          <tr>
                            <td>Deva</td>
                            <td>Hindu gods. Elders, wise and immensely powerful but unaccustomed to dealing with world affairs</td>
                          </tr>
                          <tr>
                            <td>K'Asunel</td>
                            <td>The Mayan gods. Deeply anti-Titans, bordering on fanaticism</td>
                          </tr>
                          <tr>
                            <td>Neter</td>
                            <td>The Egyptian gods. Powerful, organized and keen on arcane mysteries but a bit mysterious and rigid</td>
                          </tr>
                          <tr>
                            <td>Nga Tama a Rangi</td>
                            <td>The Maori gods. Wise and strong at the same time, but with a tendency to remain secluded</td>
                          </tr>
                          <tr>
                            <td>Orisha</td>
                            <td>The African gods. Conquerors hungry for combat, focused on expansion and little focused on diplomacy</td>
                          </tr>
                          <tr>
                            <td>Teotl</td>
                            <td>The Aztec gods. Violent and conquering fighters, adepts of blood magic</td>
                          </tr>
                          <tr>
                            <td>Theoi</td>
                            <td>The Greek gods. Powerful, versatile and led by Zeus himself</td>
                          </tr>
                          <tr>
                            <td>Tuatha Dé Danann</td>
                            <td>The Celtic gods. Proud, combative and close to Nature</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-3" outlined>
                  <v-card-title>Fate Consequences</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sun's Benevolence</td>
                            <td>Helios guards you and protects you from untoward events for the moment</td>
                          </tr>
                          <tr>
                            <td>Smiling Moon</td>
                            <td>Selene keeps you and protects you from Fate for now</td>
                          </tr>
                          <tr>
                            <td>Eternal Legend</td>
                            <td>You lose a Fate Binding, your Legend is not yet written</td>
                          </tr>
                          <tr>
                            <td>Divine Party</td>
                            <td>A little music seems to guide your story, temporarily protecting you from Fate</td>
                          </tr>
                          <tr>
                            <td>Dark Prophecy</td>
                            <td>You lose X of Heroism and X of Prophets, where X is your number of Fate Bindings</td>
                          </tr>
                          <tr>
                            <td>Refugee Influx</td>
                            <td>X of your Population are transferred to the player(s) with the least Victory Points</td>
                          </tr>
                          <tr>
                            <td>Dragon Fly-By</td>
                            <td>You lose X of Orichalcum and X of Population, where X is your number of Fate Bindings</td>
                          </tr>
                          <tr>
                            <td>Disturbance of Legend</td>
                            <td>All players mysteriously gain 1 Link of Destiny because of your transgressions. It's up to you to confess to them ... or not!</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <v-card class="pa-3" outlined>
                  <v-card-title>Processing of a Game Turn</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <ul>
                      <li>Hand of Fate Application</li>
                      <li>
                        Calculation of the conquering armies sent to the
                        <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes in the hands of the Titans (attacks + infiltrations).
                      </li>
                      <li>Processing orders unrelated to conquest.</li>
                      <li>
                        Conquest Resolution:
                        <ul>
                          <li>
                            On each Plane, if the divine forces are
                            <u>higher</u> then the the Titanic forces present, the Plane is conquered.
                          </li>
                          <li>
                            Allocation of 
                            <v-icon small>fa-trophy</v-icon>&nbsp;Victory points according to the ranking of the armed forces sent (infiltration included).
                          </li>
                          <li>Transfer of ownership of the Plane to the player who sent the most armed forces to it.</li>
                        </ul>
                      </li>
                      <li>Resolution of bets made on attacks.</li>
                      <li>
                        Increase of titanic forces on
                        <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes still in the hands of the Titans after conquests resolutions. If at least one conquest was victorious, titanic forces are increased by half the number of players (rounded down) + the number of Planes conquered by the Gods this turn. If no Plane was conquered this turn, titanic forces stay the same.
                      </li>
                      <li>Resources of all players are increased with the basic income detailed in the Appendices.</li>
                      <li>On the last turn : check for the global victory conditions.</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="2">
                <v-card class="pa-3" outlined>
                  <v-card-title>Global Victory</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Players</th>
                            <th class="text-left">
                              <v-icon small>mdi-layers-triple</v-icon>&nbsp;Planes to Control
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>3</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>4</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>5</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>6</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>7</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>8</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>8</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>8</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>9</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>9</td>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>10</td>
                          </tr>
                          <tr>
                            <td>12</td>
                            <td>10</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="2">
                <v-card class="pa-3" outlined>
                  <v-card-title>Income</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Ressources</th>
                            <th class="text-left">Income/Turn</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                            </td>
                            <td>+2</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                            </td>
                            <td>+0</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                            </td>
                            <td>+1</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                            </td>
                            <td>+2</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                            </td>
                            <td>+2</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings
                            </td>
                            <td>+0</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-3" outlined>
                  <v-card-title>Planes / Ressources</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Plane</th>
                            <th class="text-left">Ressource</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>The World</td>
                            <td>
                              <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings (reduction)
                            </td>
                          </tr>
                          <tr>
                            <td>Fairie</td>
                            <td>
                              <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                            </td>
                          </tr>
                          <tr>
                            <td>Shambhala</td>
                            <td>
                              <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                            </td>
                          </tr>
                          <tr>
                            <td>Aunu</td>
                            <td>
                              <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                            </td>
                          </tr>
                          <tr>
                            <td>Aether</td>
                            <td>
                              <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                            </td>
                          </tr>
                          <tr>
                            <td>Mont Olympe</td>
                            <td>
                              <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                            </td>
                          </tr>
                          <tr>
                            <td>Kosmos</td>
                            <td>
                              <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                            </td>
                          </tr>
                          <tr>
                            <td>Devaloka</td>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                            </td>
                          </tr>
                          <tr>
                            <td>Nyx</td>
                            <td>
                              <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                            </td>
                          </tr>
                          <tr>
                            <td>Sheol</td>
                            <td>
                              <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card class="pa-3" outlined>
                  <v-card-title>Orders</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum Orders
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Prosperity</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                              </li>
                              <li>
                                Reward : 1
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets and 1
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Opulence</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 4
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                              </li>
                              <li>
                                Reward : 3
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets et 3
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Investment</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                              </li>
                              <li>
                                Reward : 3
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum + the number of 
                                <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes you control this turn.
                              </li>
                            </ul>
                            <i>
                              <u>Example:</u> If you control 2 Planes this turn, spending 2 Orichalcum you will get 5 Orichalcum the next turn.
                            </i>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Anticipation</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : X
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                              </li>
                              <li>
                                Reward : X/2
                                <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points (if the bet succeeds)
                                <br />
                                <u>
                                  <b>OU</b>
                                </u> X
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings (if the bet fails)
                              </li>
                            </ul>
                            <i>
                              <u>Example :</u>Trigger the order "Anticipation" with 7 Orichalcum by betting on the defeat of the attack on the Mount Olympus Plane you will cost 7 Orichalcum and will grant you 4 Victory Points if the attack on Mount Olympus has indeed failed, or you will win 7 Fate Bindings if the attack on Mount Olympus was successful.
                            </i>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-fist-raised</v-icon>&nbsp;Army Orders
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Attack</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : X
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Armies to attack a plan controlled by the Titans
                              </li>
                              <li>
                                Reward : (if the attack succeeds)
                                <ul>
                                  <li>
                                    5
                                    <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points and 2
                                    <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings if you attacked with the most forces
                                  </li>
                                  <li>
                                    3
                                    <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points if you arrived second
                                  </li>
                                  <li>
                                    2
                                    <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points if you arrived third
                                  </li>
                                </ul>
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Stabiliser</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 4
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                              </li>
                              <li>
                                Reward : You lose 2
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-jedi</v-icon>&nbsp;Heroism Orders
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Create a Godborn</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                              </li>
                              <li>
                                Reward : 2
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Risky Exploration</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 3
                                <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                              </li>
                              <li>Reward : In the next turn, you will be able to see the titanic forces on the Titan-controlled Planes.</li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Call to Adventure</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 3
                                <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                              </li>
                              <li>
                                Reward : 2D3
                                <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Apotheosis</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 6
                                <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                              </li>
                              <li>
                                Reward : 1D4
                                <v-icon small>fa-trophy</v-icon>&nbsp;Victory Points
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-eye</v-icon>&nbsp;Prophets Orders
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Magical Spying</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>
                                Reward : Next turn, your will be able the see the
                                <v-icon small>fa-receipt</v-icon>&nbsp;Order Sheets sent this turn from two players you have selected.
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Infiltration</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 4
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>
                                Reward : All Planes attacked at the end of this turn have their divine armies increased by 1 on your behalf. This does not consume any resource
                                <v-icon small>fa-fist-raised</v-icon>&nbsp; Army. If no attack is triggered this turn, your expense will be reimbursed.
                              </li>
                            </ul>
                            <i>
                              <u>Example :</u> If during the turn, Mount Olympus, Nyx and The World are attacked, triggering the order "Infiltration" will cost you 4 Prophets. When resolving conquests on these Planes, your military presence will be increased by 1 on all Planes attacked without you having spent any Army.
                            </i>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Prophecy</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 3
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>Reward : In the next round, you will be able to see the titanic forces present on the Titan-controlled Planes.</li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Beneficient Oracles</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>
                                Reward : 2
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Augury</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 1
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>
                                Reward : 1D3 - 1
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Vision of the Future</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 1
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>
                                Reward : Half the chance of winning or losing 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Legend Redistribution</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 4
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                              <li>
                                Reward : You gain 2
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population and you lose 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding.
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-user-friends</v-icon>&nbsp;Population Order
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Settle a Plane</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : X
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                              <li>
                                Reward :
                                <ul>
                                  <li>The controller of the targeted Plane gains X / 2 of the resource associated with the Plane</li>
                                  <li>You gain X of this same resource</li>
                                </ul>
                                <i>
                                  <u>Example :</u> Triggering the order "Settle a Plane" with 5 Population by targeting the Fairie Plane will cost you 5 Population and will bring you 5 Orichalcum. The Plane controller will receive 3 Orichalcum. If you are the controller of Fairie, you gain 8 Orichalcum. 
                                </i>
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Recruitment Drive</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                              <li>
                                Reward : 1
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Army + the number of Planes you control this turn.
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Informants</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 2
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                              <li>
                                Reward : 1D4
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Civilisation</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : 4
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population
                              </li>
                              <li>
                                Reward : 1D3
                                <v-icon small>fa-user-friends</v-icon>&nbsp;Population, 1D3
                                <v-icon small>fa-gem</v-icon>&nbsp;Orichalcum et 3
                                <v-icon small>fa-fist-raised</v-icon>&nbsp;Army
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding Orders
                      </titre>
                      <content>
                        <bloc-3>
                          <titre>Pantheon Celebration</titre>
                          <content>
                            <ul>
                              <li>Cost : None</li>
                              <li>
                                Reward : Your
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings change by 1D6 - 1D10
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Epic Destiny</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : You gain 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                              </li>
                              <li>
                                Reward : 2
                                <v-icon small>fa-jedi</v-icon>&nbsp;Heroism
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Gossip</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : You gain 1
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Binding
                              </li>
                              <li>
                                Reward : 1D3
                                <v-icon small>fa-eye</v-icon>&nbsp;Prophets
                              </li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                        <bloc-3>
                          <titre>Alea Jacta Est</titre>
                          <content>
                            <ul>
                              <li>
                                Cost : You gain 4
                                <v-icon small>fa-spider</v-icon>&nbsp;Fate Bindings
                              </li>
                              <li>Reward : 2D3 of each other resource(Orichalcum, Army, Heroism, Prophets and Population)</li>
                            </ul>
                            <p></p>
                          </content>
                        </bloc-3>
                      </content>
                    </bloc-1>
                    <v-divider class="mb-3"></v-divider>
                    <bloc-1>
                      <titre>
                        <v-icon small>fa-bolt</v-icon>&nbsp;The Hand of Fate
                      </titre>
                      <content>
                        <ul>
                          <li>
                            Choose 3
                            <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Planes to decrease the titanic forces of by 1 Army
                          </li>
                          <li>
                            Choose a
                            <v-icon small>mdi-layers-triple</v-icon>&nbsp;Cosmic Plane to increase the titanic forces of by 3 Army
                          </li>
                        </ul>
                        <i>
                          <u>Example:</u> At the end of your turn, you can decide to decrease the titanic forces on Fairie, Mount Olympus and The World Planes by 1 ... while increasing the titanic forces on Aunu by 3.
                          <b>This order is only applicable on Planes controlled by the Titans.</b>
                        </i>
                      </content>
                    </bloc-1>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "../../store";

export default Vue.extend({
  name: "RulesVO",
  computed: {
    carouselHeight: function() {
      return this.$vuetify.breakpoint.xs ? "413px" : "650px";
    }
  },
  data: () => ({
    tabs: 0
  })
});
</script>