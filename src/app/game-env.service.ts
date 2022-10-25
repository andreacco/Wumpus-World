import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class GameEnvService {
  constructor() {}

  jugar() {
    class ArrayUtils {
      static getIndexesFromSize(lines: number) {
        let array = [];
        for (let i = 0; i < lines; i++) {
          array.push(i);
        }
        return array;
      }

      static getIndexes(lines: number, columns: number) {
        let array = [];
        for (let i = 0; i < lines; i++) {
          for (let j = 0; j < columns; j++) {
            array.push([i, j]);
          }
        }
        return array;
      }

      static copy(array: string | any[]) {
        let copy = [];
        for (let i = 0; i < array.length; i++) {
          copy.push(array[i]);
        }
        return copy;
      }

      static equals(array1: string | any[], array2: string | any[]) {
        if (array1.length !== array2.length) {
          return false;
        }
        for (let i = 0; i < array1.length; i++) {
          if (array1[i] != array2[i]) {
            return false;
          }
        }
        return true;
      }

      static search(array: string | any[], value: any) {
        for (let i = 0; i < array.length; i++) {
          if (ArrayUtils.equals(array[i], value)) {
            return array[i];
          }
        }
      }

      static contains(array: string | any[], value: any) {
        for (let i = 0; i < array.length; i++) {
          if (ArrayUtils.equals(array[i], value)) {
            return true;
          }
        }
        return false;
      }

      static removeByValue(array: any[], value: any) {
        var index = array.indexOf(value);
        if (index > -1) {
          array.splice(index, 1);
        }
      }

      static removeByValues(array: any[], values: any[]) {
        let filtered: any[] = [];
        array.forEach((el1: any) => {
          if (!ArrayUtils.contains(values, el1)) {
            filtered.push(el1);
          }
        });
        return filtered;
      }
    }

    class RandomUtils {
      static shuffle(array: Array<any>) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

      static getRandomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      static getRandomIndex(array: string | any[]) {
        return RandomUtils.getRandomInteger(0, array.length);
      }

      static getRandomElement(array: any[]) {
        return array[RandomUtils.getRandomIndex(array)];
      }

      static getRandomElements(
        array: string | any[],
        numberOfElements: number
      ) {
        let indexes = ArrayUtils.getIndexesFromSize(array.length);
        RandomUtils.shuffle(indexes);
        let selected = indexes.filter(
          (e: any, i: number) => i < numberOfElements
        );
        return selected.map((el: any) => array[el]);
      }

      static getRandomLevel(lines: any, columns: any) {
        let positions = ArrayUtils.getIndexes(lines, columns);
        positions = ArrayUtils.removeByValues(positions, [[0, 0]]);
        positions = ArrayUtils.removeByValues(positions, [[0, 1]]);
        positions = ArrayUtils.removeByValues(positions, [[1, 0]]);
        positions = ArrayUtils.removeByValues(positions, [[1, 1]]);
        let holes = RandomUtils.getRandomElements(positions, 10);
        positions = ArrayUtils.removeByValues(positions, holes);
        let wumpus = RandomUtils.getRandomElements(positions, 8);
        positions = ArrayUtils.removeByValues(positions, wumpus);
        let golds = RandomUtils.getRandomElements(positions, 8);
        positions = ArrayUtils.removeByValues(positions, golds);
        return { holes, wumpus, golds };
      }
    }

    let resources: any = {
      images: {},
      musics: {},
      play: function (name: string | number, override = true) {
        let sound = this.musics[name];
        if (sound) {
          if (override) {
            sound.play();
          } else {
            if (!sound.playing()) {
              sound.play();
            }
          }
        }
      },

      stop: function (name: string | number) {
        let sound = this.musics[name];
        if (sound && sound.playing()) {
          sound.stop();
          sound.unload();
        }
      },

      loadMusic: function (name: any, file: any) {
        console.log('Loading sound', file);
        return new Promise((resolve, reject) => {
          let sound = new Howl({
            src: [file],
            html5: true,
            preload: true,
          });
          sound.once('load', function () {
            resolve([name, sound]);
          });
        });
      },

      loadImage: function (name: any, url: string) {
        console.log('Loading image', url);
        return new Promise((resolve, reject) => {
          var image = new Image();
          image.onload = function () {
            resolve([name, image]);
          };
          image.src = url;
        });
      },

      loadMusics: function () {
        return new Promise((resolve, reject) => {
          const files = [
            this.loadMusic('move', 'assets/mp3/move.mp3'),
            this.loadMusic('game-over', 'assets/mp3/game-over.mp3'),
            this.loadMusic('win', 'assets/mp3/ganaste.mp3'),
            this.loadMusic('gold', 'assets/mp3/oro.mp3'),
            this.loadMusic('matarWumpus', 'assets/mp3/matar-al-wumpus.mp3'),
            this.loadMusic('fondo', 'assets/mp3/fondo.mp3'),
          ];

          Promise.all(files)
            .then((result: any) => {
              resolve(['musics', Object.fromEntries(result)]);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },

      loadImages: function () {
        return new Promise((resolve, reject) => {
          const files = [
            this.loadImage('facing_to_up', 'assets/img/boy-up.png'),
            this.loadImage('facing_to_down', 'assets/img/boy-down.png'),
            this.loadImage('facing_to_left', 'assets/img/boy-left.png'),
            this.loadImage('facing_to_right', 'assets/img/boy-right.png'),
            this.loadImage('wall', 'assets/img/wall.png'),
            this.loadImage('floor', 'assets/img/floor.png'),
            this.loadImage('hole', 'assets/img/hole.png'),
            this.loadImage('wumpus', 'assets/img/wumpus.png'),
            this.loadImage('gold', 'assets/img/oro.png'),
            this.loadImage('floor_gold', 'assets/img/floor_gold.png'),
          ];

          Promise.all(files)
            .then((result: any) => {
              resolve(['images', Object.fromEntries(result)]);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },

      load: function () {
        var that = this;
        return new Promise((resolve, reject) => {
          const files = [this.loadImages(), this.loadMusics()];
          Promise.all(files)
            .then((result: any) => {
              result = Object.fromEntries(result);
              that.images = result.images;
              that.musics = result.musics;
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    };

    var Environment = function (
      this: any,
      i: any,
      j: any,
      width: any,
      height: any
    ) {
      this.i = i;
      this.j = j;
      this.width = width;
      this.height = height;
      this.removeWalls = false;
      this.visible = [];
      this.holes = [];
      this.wumpus = [];
      this.golds = [];
      this.level = {};
      this.restart = function () {
        this.visible = this.getMatrix(this.i, this.j);
        this.visible[0][0] = 1;
        this.golds = ArrayUtils.copy(this.level.golds);
        this.holes = ArrayUtils.copy(this.level.holes);
        this.wumpus = ArrayUtils.copy(this.level.wumpus);
      };
      this.randomInitialization = function () {
        this.level = RandomUtils.getRandomLevel(this.i, this.j);
        this.restart();
      };
      this.getMatrix = function (
        maxI: number,
        maxJ: number,
        initialValue: number
      ) {
        var initialValue = initialValue || 0;
        var matrix = new Array(maxI);
        for (var i = 0; i < maxI; i++) {
          matrix[i] = new Array(maxJ);
          for (var j = 0; j < maxJ; j++) {
            matrix[i][j] = initialValue;
          }
        }
        return matrix;
      };

      this.removeWumpus = function (deadWumpus: (string | number)[]) {
        this.visible[deadWumpus[0]][deadWumpus[1]] = 1;
        this.wumpus = ArrayUtils.removeByValues(this.wumpus, [deadWumpus]);
      };

      this.removeGold = function (gold: any) {
        this.golds = ArrayUtils.removeByValues(this.golds, [gold]);
      };

      this.contains = function (array: any, i: any, j: any) {
        return this.get(array, i, j) != false;
      };

      this.get = function (array: any, i: any, j: any) {
        return ArrayUtils.search(array, [i, j]);
      };

      this.hasAWumpus = function (player: {
        getPosI: () => any;
        getPosJ: () => any;
      }) {
        for (let i = 0; i < this.wumpus.length; i++) {
          const wumpu = this.wumpus[i];
          if (wumpu[0] == player.getPosI() && wumpu[1] == player.getPosJ()) {
            return true;
          }
        }
        return false;
      };

      this.hasAHole = function (player: {
        getPosI: () => any;
        getPosJ: () => any;
      }) {
        for (let i = 0; i < this.holes.length; i++) {
          const hole = this.holes[i];
          if (hole[0] == player.getPosI() && hole[1] == player.getPosJ()) {
            return true;
          }
        }
        return false;
      };

      this.draw = function (ctx: {
        drawImage: (
          arg0: any,
          arg1: number,
          arg2: number,
          arg3: any,
          arg4: any
        ) => void;
      }) {
        const breeze = 'brisa';
        const stench = 'hedor';
        for (var i = 0; i < this.i; i++) {
          for (var j = 0; j < this.j; j++) {
            ctx.drawImage(
              resources.images['floor'],
              i * this.width,
              j * this.height,
              this.width,
              this.height
            );
          }
        }
        for (let i = 0; i < this.holes.length; i++) {
          const hole = this.holes[i];
          ctx.drawImage(
            resources.images['hole'],
            hole[0] * this.width,
            hole[1] * this.height,
            this.width,
            this.height
          );
          this.drawText(ctx, breeze, hole[0], hole[1] + 1, 3);
          this.drawText(ctx, breeze, hole[0], hole[1] - 1, 3);
          this.drawText(ctx, breeze, hole[0] + 1, hole[1], 3);
          this.drawText(ctx, breeze, hole[0] - 1, hole[1], 3);
        }

        for (let i = 0; i < this.wumpus.length; i++) {
          const wumpu = this.wumpus[i];
          ctx.drawImage(
            resources.images['wumpus'],
            wumpu[0] * this.width,
            wumpu[1] * this.height,
            this.width,
            this.height
          );
          this.drawText(ctx, stench, wumpu[0], wumpu[1] + 1, 14);
          this.drawText(ctx, stench, wumpu[0], wumpu[1] - 1, 14);
          this.drawText(ctx, stench, wumpu[0] + 1, wumpu[1], 14);
          this.drawText(ctx, stench, wumpu[0] - 1, wumpu[1], 14);
        }

        for (let i = 0; i < this.golds.length; i++) {
          const gold = this.golds[i];
          ctx.drawImage(
            resources.images['floor_gold'],
            gold[0] * this.width,
            gold[1] * this.height,
            this.width,
            this.height
          );
          ctx.drawImage(
            resources.images['gold'],
            gold[0] * this.width,
            gold[1] * this.height,
            this.width,
            this.height
          );
        }

        for (var i = 0; i < this.i; i++) {
          for (var j = 0; j < this.j; j++) {
            if (this.visible[i][j] == 0 && !this.removeWalls) {
              ctx.drawImage(
                resources.images['wall'],
                i * this.width,
                j * this.height,
                this.width,
                this.height
              );
            }
          }
        }

        for (let i = 1; i < this.i; i++) {
          this.drawLine(
            ctx,
            i * this.width,
            0,
            i * this.height,
            this.j * this.width
          );
        }

        for (let j = 1; j < this.j; j++) {
          this.drawLine(
            ctx,
            0,
            j * this.height,
            this.i * this.width,
            j * this.height
          );
        }
      };

      this.drawText = function (
        ctx: {
          font: string;
          fillStyle: string;
          textBaseline: string;
          fillText: (arg0: any, arg1: number, arg2: any) => void;
        },
        text: any,
        i: number,
        j: number,
        offset: number
      ) {
        ctx.font = '12px Verdana';
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'hanging';
        ctx.fillText(text, i * this.width + 2, j * this.height + offset);
      };

      this.drawLine = function (
        ctx: {
          strokeStyle: string;
          lineWidth: number;
          moveTo: (arg0: any, arg1: any) => void;
          lineTo: (arg0: any, arg1: any) => void;
          stroke: () => void;
        },
        x0: number,
        y0: number,
        x1: number,
        y1: number
      ) {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1.0;
        //ctx.translate(0.5, 0.5)
        ctx.moveTo(x0 + 0.5, y0 + 0.5);
        ctx.lineTo(x1 + 0.5, y1 + 0.5);
        ctx.stroke();
      };

      this.randomInitialization();
    };

    var FACING_TO_UP = 1,
      FACING_TO_DOWN = 2,
      FACING_TO_LEFT = 3,
      FACING_TO_RIGHT = 4;

    var Player = function (
      this: any,
      env: {
        restart: () => void;
        width: number;
        i: number;
        height: number;
        j: number;
        removeWumpus: (arg0: any) => void;
        removeGold: (arg0: any) => void;
        golds: string | any[];
        hasAHole: (arg0: any) => any;
        hasAWumpus: (arg0: any) => any;
        draw: (arg0: any) => void;
        holes: any;
        wumpus: any;
        removeWalls: any;
      },
      x: number,
      y: number
    ) {
      this.x = x;
      this.y = y;
      this.env = env;
      this.speed = this.env.height;
      this.direction = FACING_TO_DOWN;
      this.score = 0;
      this.arrow = 10;

      this.markAsVisible = function () {
        this.env.visible[this.getPosI()][this.getPosJ()] = 1;
      };

      this.kill = function (keys: { space: boolean }) {
        var deadWumpus = null;

        if (keys.space) {
          if (this.arrow == 0) {
            return false;
          }

          this.arrow--;

          keys.space = false;

          var pos = null;

          if (this.direction == FACING_TO_UP)
            pos = { i: this.getPosI(), j: this.getPosJ() - 1 };
          if (this.direction == FACING_TO_DOWN)
            pos = { i: this.getPosI(), j: this.getPosJ() + 1 };
          if (this.direction == FACING_TO_LEFT)
            pos = { i: this.getPosI() - 1, j: this.getPosJ() };
          if (this.direction == FACING_TO_RIGHT)
            pos = { i: this.getPosI() + 1, j: this.getPosJ() };

          deadWumpus = this.env.get(this.env.wumpus, pos?.i, pos?.j);

          if (deadWumpus) {
            resources.play('matarWumpus');
          } else {
            resources.play('error');
          }
        }

        return deadWumpus;
      };

      this.capture = function (keys: { enter: boolean }) {
        var capturedGold = null;

        if (keys.enter) {
          keys.enter = false;

          capturedGold = this.env.get(
            this.env.golds,
            this.getPosI(),
            this.getPosJ()
          );
        }

        return capturedGold;
      };

      this.update = function (keys: {
        up: boolean;
        down: boolean;
        left: boolean;
        right: boolean;
      }) {
        // Previous position
        var prevX = this.x,
          prevY = this.y;

        // Up key takes priority over down
        if (keys.up) {
          if (this.direction == FACING_TO_UP && this.y > 0) {
            this.y -= this.speed;
            resources.play('move');
          } else {
            this.direction = FACING_TO_UP;
          }
        } else if (keys.down) {
          if (
            this.direction == FACING_TO_DOWN &&
            this.y + this.speed < this.env.j * this.env.height
          ) {
            this.y += this.speed;
            resources.play('move');
          } else {
            this.direction = FACING_TO_DOWN;
          }
        } else if (keys.left) {
          if (this.direction == FACING_TO_LEFT && this.x > 0) {
            this.x -= this.speed;
            resources.play('move');
          } else {
            this.direction = FACING_TO_LEFT;
          }
        } else if (keys.right) {
          if (
            this.direction == FACING_TO_RIGHT &&
            this.x + this.speed < this.env.i * this.env.width
          ) {
            this.x += this.speed;
            resources.play('move');
          } else {
            this.direction = FACING_TO_RIGHT;
          }
        }

        this.markAsVisible();

        keys.up = keys.down = keys.left = keys.right = false;

        return prevX != this.x || prevY != this.y ? true : false;
      };

      this.getPosI = function () {
        return Math.floor(this.x / this.env.width);
      };

      this.getPosJ = function (y: any) {
        return Math.floor(this.y / this.env.height);
      };

      this.draw = function (ctx: {
        drawImage: (
          arg0: any,
          arg1: any,
          arg2: any,
          arg3: any,
          arg4: any
        ) => void;
      }) {
        if (this.direction == FACING_TO_DOWN) {
          ctx.drawImage(
            resources.images['facing_to_down'],
            this.x,
            this.y,
            this.env.width,
            this.env.height
          );
        } else if (this.direction == FACING_TO_UP) {
          ctx.drawImage(
            resources.images['facing_to_up'],
            this.x,
            this.y,
            this.env.width,
            this.env.height
          );
        } else if (this.direction == FACING_TO_LEFT) {
          ctx.drawImage(
            resources.images['facing_to_left'],
            this.x,
            this.y,
            this.env.width,
            this.env.height
          );
        } else if (this.direction == FACING_TO_RIGHT) {
          ctx.drawImage(
            resources.images['facing_to_right'],
            this.x,
            this.y,
            this.env.width,
            this.env.height
          );
        }
      };
    };

    var canvas: any,
      ctx: {
        clearRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void;
      },
      keys: { onKeyDown: (arg0: any) => void },
      env: {
        restart: () => void;
        width: number;
        i: number;
        height: number;
        j: number;
        removeWumpus: (arg0: any) => void;
        removeGold: (arg0: any) => void;
        golds: any;
        hasAHole: (arg0: any) => any;
        hasAWumpus: (arg0: any) => any;
        draw: (arg0: any) => void;
        holes: any;
        wumpus: any;
        removeWalls: any;
      },
      isAlive = true,
      isFinished = false,
      player: {
        update: (arg0: any) => any;
        score: number | any;
        kill: (arg0: any) => any;
        capture: (arg0: any) => any;
        arrow:
          | string
          | ((
              this: HTMLElement,
              index: number,
              oldhtml: string
            ) => string );
        draw: (arg0: any) => void;
      };

    function restart() {
      if (!env) {
        env = new (Environment as any)(15, 8, 64, 64);
      }

      // We need to create a new environment if it is the first time of the player won
      if (isFinished) {
        env = new (Environment as any)(15, 8, 64, 64);
      } else {
        env.restart();
      }

      player = new (Player as any)(env, 0, 0);

      ($('#modal-win') as any).modal('hide');
      ($('#modal-game-over') as any).modal('hide');

      resources.stop('game-over');
      resources.stop('win');
      resources.play('fondo', false);

      (isAlive = true), (isFinished = false), animate();
    }

    // Browser window resize
    function resizeCanvas() {
      canvas.width = env.width * env.i;
      canvas.height = env.height * env.j;
    }

    // Keyboard key down
    function onKeydown(e: any) {
      if (player) {
        keys.onKeyDown(e);
      }
      keys.onKeyDown(e);

      animate();
    }

    function update() {
      if (player.update(keys)) {
        player.score -= 10;
      }

      var deadWumpus = player.kill(keys);

      if (deadWumpus) {
        player.score += 1000;
        env.removeWumpus(deadWumpus);
      }

      var capturedGold = player.capture(keys);

      if (capturedGold) {
        player.score += 1000;

        env.removeGold(capturedGold);

        resources.play('gold');

        if (env.golds.length == 0) {
          isFinished = true;
        }
      }

      if (env.hasAHole(player) || env.hasAWumpus(player)) {
        isAlive = false;
      }

      $('#score').html(player.score);
      $('#arrow').html(player.arrow);
      $('#gold').html(env.golds.length);

      if (!isAlive) {
        displayGameOver();
      }

      if (isFinished) {
        displayCongratulations();
      }
    }

    function displayGameOver() {
      ($('#modal-game-over') as any).modal('show');
      resources.play('game-over', false);
      resources.stop('fondo');
    }

    function displayCongratulations() {
      ($('#modal-win') as any).modal('show');
      resources.play('win', false);
      resources.stop('fondo');
    }

    function draw() {
      // Wipe the canvas clean
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (env) {
        env.draw(ctx);
      }

      if (player) {
        player.draw(ctx);
      }
    }

    function animate() {
      update();
      draw();
    }

    function loadEnvironment(hash: string) {
      var link = atob(hash.replace('#', ''));

      var obj = $.parseJSON(link);

      env.holes = obj.holes;
      env.golds = obj.golds;
      env.wumpus = obj.wumpus;

      animate();
    }

    $(function () {
      console.log('Welcome to Wumpus World Simulator');

      // Declare the canvas and rendering context
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      keys = new (Keys as any)();

      $('.btn-restart').click(function () {
        restart();
      });

      $('.restart-sidebar').click(function () {
        restart();
      });

      resources.load().then(() => {
        resources.play('fondo', false);

        var hash = window.location.hash;

        if (hash) {
          loadEnvironment(hash);
        }

        restart();

        resizeCanvas();

        window.addEventListener('keydown', onKeydown, false);

        animate();
      });
    });


    var Keys = function (
      up: boolean,
      left: boolean,
      right: boolean,
      down: boolean,
      space: boolean,
      enter: boolean
    ) {
      var up = up || false,
        left = left || false,
        right = right || false,
        down = down || false;
      space = space || false;
      enter = enter || false;

      var onKeyDown = function (
        this: {
          up: boolean;
          left: boolean;
          right: boolean;
          down: boolean;
          space: boolean;
          enter: boolean;
          onKeyDown: (e: { keyCode: any }) => void;
          onKeyUp: (e: { keyCode: any }) => void;
        },
        e: { keyCode: any }
      ) {
        if (!isAlive || isFinished) {
          return;
        }

        var that = this,
          c = e.keyCode;

        switch (c) {
          // Controls
          case 37: // Left
            that.left = true;
            break;
          case 38: // Up
            that.up = true;
            break;
          case 39: // Right
            that.right = true; // Will take priority over the left key
            break;
          case 40: // Down
            that.down = true;
            break;
          case 32: // Space
            that.space = true;
            break;
          case 13: // enter
            that.enter = true;
            break;
        }
      };

      var onKeyUp = function (
        this: {
          up: boolean;
          left: boolean;
          right: boolean;
          down: boolean;
          space: boolean;
          enter: boolean;
          onKeyDown: (e: { keyCode: any }) => void;
          onKeyUp: (e: { keyCode: any }) => void;
        },
        e: { keyCode: any }
      ) {
        var that = this,
          c = e.keyCode;
        switch (c) {
          case 37: // Left
            that.left = true;
            break;
          case 38: // Up
            that.up = true;
            break;
          case 39: // Right
            that.right = true;
            break;
          case 40: // Down
            that.down = true;
            break;
          case 32: // Space
            that.space = true;
            break;
          case 13: // enter
            that.enter = true;
            break;
        }
      };

      var onKeyUp = function (
        this: {
          up: boolean;
          left: boolean;
          right: boolean;
          down: boolean;
          space: boolean;
          enter: boolean;
          onKeyDown: (
            this: {
              up: boolean;
              left: boolean;
              right: boolean;
              down: boolean;
              space: boolean;
              enter: boolean;
              onKeyDown: (e: { keyCode: any }) => void;
              onKeyUp: (e: { keyCode: any }) => void;
            },
            e: {
              keyCode: any;
            }
          ) => void;
          onKeyUp: (
            this: {
              up: boolean;
              left: boolean;
              right: boolean;
              down: boolean;
              space: boolean;
              enter: boolean;
              onKeyDown: (e: { keyCode: any }) => void;
              onKeyUp: (e: { keyCode: any }) => void;
            },
            e: { keyCode: any }
          ) => void;
        },
        e: { keyCode: any }
      ) {
        var that = this,
          c = e.keyCode;
        switch (c) {
          case 37: // Left
            that.left = false;
            break;
          case 38: // Up
            that.up = false;
            break;
          case 39: // Right
            that.right = false;
            break;
          case 40: // Down
            that.down = false;
            break;
          case 32: // Space
            that.space = false;
            break;
          case 13: // enter
            that.enter = false;
            break;
        }
      };

      return {
        up: up,
        left: left,
        right: right,
        down: down,
        space: space,
        enter: enter,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp,
      };
    };

  }
}
