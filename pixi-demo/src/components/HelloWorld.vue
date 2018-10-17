<template>
  <div class="hello">
    <div class="canvas-wrap" ref="canvasWrap"></div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      current: 0,
      spriteArr: {}
    }
  },
  mounted () {
    this.initPixi()
  },
  methods: {
    initPixi () {
      let changeImageTime = 200
      const SHADOW_SCALE = {
        x: 1,
        y: 1,
        flag: true
      }
      let scaleDis = 0.0006
      let starFlag = false
      let image4Flag = true
      const IMAGE_ARR = []
      const SCREEN_W = this.$refs.canvasWrap.getBoundingClientRect().width
      const SCREEN_H = this.$refs.canvasWrap.getBoundingClientRect().height
      let imageData = [
        {
          num: 0,
          x: 930,
          y: 0,
          v: changeImageTime,
          w: 640,
          h: 1029,
          uw: 640,
          uh: 1029,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        },
        {
          num: 1,
          x: 1167,
          y: 367,
          w: 276,
          h: 448,
          uw: 1875,
          uh: 3015,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        },
        {
          num: 2,
          x: 424,
          y: 2172,
          w: 175,
          h: 280,
          uw: 1875,
          uh: 3015,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        },
        {
          num: 3,
          x: 531,
          y: 2267,
          w: 102,
          h: 163,
          uw: 1875,
          uh: 3015,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        },
        {
          num: 4,
          x: 695,
          y: 1410,
          x2: 231,
          y2: 142,
          w: 164,
          h: 264,
          uw: 1875,
          uh: 3015,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H,
          tt: 0
        },
        {
          num: 5,
          x: 117,
          y: 176,
          w: 609,
          h: 609,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H,
          img: {
            w: 1123,
            h: 3015
          }
        },
        {
          num: 6,
          x: -1123,
          y: 0,
          w: 1123,
          h: 3015,
          v: changeImageTime,
          ow: 1123,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        },
        {
          num: 7,
          mx: 1181,
          my: 1366,
          x: -1875 * 2,
          y: 0,
          mw: 211,
          mh: 212,
          w: 1875,
          h: 3015,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        },
        {
          num: 8,
          x: 1015,
          y: 983,
          w: 139,
          h: 139,
          v: changeImageTime,
          ow: 1875,
          oh: 3015,
          ew: SCREEN_W,
          eh: SCREEN_H
        }
      ]
      let app = new PIXI.Application(SCREEN_W, SCREEN_H, { backgroundColor: 0x1099bb })
      this.$refs.canvasWrap.appendChild(app.view)
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
      for (let i = 0; i < imageData.length; i++) {
        let image = PIXI.Sprite.fromImage(require(`../assets/img/${imageData.length - i}.jpg`))
        image.scale.x = imageData[imageData.length - 1 - i].ew / imageData[imageData.length - 1 - i].w
        image.scale.y = imageData[imageData.length - 1 - i].eh / imageData[imageData.length - 1 - i].h
        image.x = -(imageData[imageData.length - 1 - i].ew / imageData[imageData.length - 1 - i].w) * imageData[imageData.length - 1 - i].x
        image.y = -(imageData[imageData.length - 1 - i].eh / imageData[imageData.length - 1 - i].h) * imageData[imageData.length - 1 - i].y
        IMAGE_ARR.unshift(image)
        app.stage.addChild(image)
      }
      let bg = PIXI.Sprite.fromImage(require('../assets/img/bg.jpg'))
      this.spriteArr.talk1 = PIXI.Sprite.fromImage(require('../assets/img/talk1.png'))
      let talk2 = PIXI.Sprite.fromImage(require('../assets/img/roll.png'))
      let btnWrapImage = PIXI.Sprite.fromImage(require('../assets/img/touch.png'))
      let btnShadowImage = PIXI.Sprite.fromImage(require('../assets/img/touch-line.png'))
      btnWrapImage.anchor.set(0.5)
      btnShadowImage.anchor.set(0.5)
      btnWrapImage.width = btnShadowImage.width = 57
      btnWrapImage.height = btnShadowImage.height = 82
      btnWrapImage.x = btnShadowImage.x = app.screen.width / 2
      btnWrapImage.y = btnShadowImage.y = app.screen.height - btnWrapImage.height
      btnShadowImage.alpha = 0.2
      btnWrapImage.interactive = true
      btnWrapImage.buttonMode = true

      this.spriteArr.talk1.scale.set(app.screen.width / 1087 / 2)
      this.spriteArr.talk1.x = app.screen.width / 4
      this.spriteArr.talk1.y = app.screen.height - 180
      this.spriteArr.talk1.alpha = 0

      talk2.scale.set(app.screen.width / 1875)
      talk2.y = app.screen.height / 2
      talk2.x = app.screen.width - talk2.width
      talk2.alpha = 0
      btnWrapImage.on('pointerdown', () => {
        starFlag = true
      }).on('pointerup', () => {
        starFlag = false
      })
      bg.width = app.screen.width
      bg.height = app.screen.height
      app.stage.addChild(this.spriteArr.talk1, talk2, btnShadowImage, btnWrapImage)
      app.ticker.add(() => {
        if (SHADOW_SCALE.flag) {
          SHADOW_SCALE.x = btnShadowImage.scale.x
          SHADOW_SCALE.y = btnShadowImage.scale.y
          SHADOW_SCALE.flag = false
        }
        if (SHADOW_SCALE.x * 1.2 < btnShadowImage.scale.x || SHADOW_SCALE.x > btnShadowImage.scale.x) {
          scaleDis = -scaleDis
        }
        btnShadowImage.scale.x += scaleDis
        btnShadowImage.scale.y += scaleDis
        btnShadowImage.alpha += scaleDis
        if (starFlag) {
          bg.visible = false
          if (this.current <= 3) {
            this.scaleSmall(IMAGE_ARR[this.current], imageData[this.current], () => {
              IMAGE_ARR[this.current].visible = false
              this.current++
            })
          }
          if (this.current === 4) {
            if (image4Flag) {
              this.scaleSmall(IMAGE_ARR[this.current], imageData[this.current], () => {
                this.spriteArr.talk1.alpha = 100
                imageData[this.current].tt += 1
                if (imageData[this.current].tt >= 80) {
                  image4Flag = false
                }
              })
            } else {
              this.spriteArr.talk1.alpha = 0
              this.scaleBig(IMAGE_ARR[this.current], imageData[this.current], () => {
                IMAGE_ARR[this.current].visible = false
                this.current = 5
              })
            }
          }
          if (this.current === 5) {
            this.scaleSmall(IMAGE_ARR[this.current], imageData[this.current], () => {
              let speed = imageData[this.current].img.w * (imageData[this.current].ew / imageData[this.current].ow) / imageData[this.current].v
              if (Math.abs(IMAGE_ARR[this.current].x - speed) >= imageData[this.current + 1].ew * 2) {
                talk2.alpha = 0
                IMAGE_ARR[this.current].visible = false
                IMAGE_ARR[this.current + 1].visible = false
                this.current = 7
              } else {
                talk2.alpha = 100
                talk2.x -= speed
                IMAGE_ARR[this.current].x -= speed
                IMAGE_ARR[this.current + 1].x -= speed
                IMAGE_ARR[this.current + 2].x -= speed
              }
            })
          }
          if (this.current === 7) {
            let image7Data = {
              x2: imageData[this.current].mx,
              y2: imageData[this.current].my,
              w: imageData[this.current].mw,
              h: imageData[this.current].mh,
              v: changeImageTime,
              ow: 1875,
              oh: 3015,
              ew: SCREEN_W,
              eh: SCREEN_H
            }
            this.scaleBig(IMAGE_ARR[this.current], image7Data, () => {
              IMAGE_ARR[this.current].visible = false
              this.current = 8
            })
          }
        }
        if (this.current === 8) {
          this.scaleSmall(IMAGE_ARR[this.current], imageData[this.current])
        }
      })
    },
    scaleBig (obj, objData, callBack) {
      const MAX_SCALE = objData.ew / objData.w
      const SCALE_X = (objData.ew / objData.w - objData.ew / objData.ow) / objData.v
      const SCALE_Y = (objData.eh / objData.h - objData.eh / objData.oh) / objData.v
      const X = objData.ew / objData.w * objData.x2 / objData.v
      const Y = objData.eh / objData.h * objData.y2 / objData.v
      if (MAX_SCALE < obj.scale.x) {
        typeof callBack === 'function' && callBack()
      } else {
        obj.scale.x += SCALE_X
        obj.scale.y += SCALE_Y
        obj.x -= X
        obj.y -= Y
      }
    },
    scaleSmall (obj, objData, callBack) {
      const MIN_SCALE = objData.ew / objData.ow
      const SCALE_X = (objData.ew / objData.w - objData.ew / objData.ow) / objData.v
      const SCALE_Y = (objData.eh / objData.h - objData.eh / objData.oh) / objData.v
      const X = objData.ew / objData.w * objData.x / objData.v
      const Y = objData.eh / objData.h * objData.y / objData.v
      if (obj.scale.x - SCALE_X <= MIN_SCALE) {
        typeof callBack === 'function' && callBack()
      } else {
        obj.scale.x -= SCALE_X
        obj.scale.y -= SCALE_Y
        obj.x += X
        obj.y += Y
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  h1, h2
    font-weight: normal

  ul
    list-style-type: none
    padding: 0

  li
    display: inline-block
    margin: 0 10px

  a
    color: #42b983

  .canvas-wrap
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 10
</style>
