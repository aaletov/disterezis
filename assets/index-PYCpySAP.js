import{P as e}from"./phaser-pjvDu-AS.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const t={type:e.AUTO,width:800,height:600,backgroundColor:8900331,physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scene:{preload:function(){this.load.image("basket","/disterezis/assets/rot.png"),this.load.image("item","/disterezis/assets/hui.png")},create:function(){i=this.physics.add.sprite(400,550,"basket").setImmovable(),i.body.setCollideWorldBounds(!0),s=this.physics.add.group(),r=this.add.text(10,10,"Score: 0",{fontSize:"20px",fill:"#000"}),this.time.addEvent({delay:1e3,loop:!0,callback:()=>{const t=e.Math.Between(50,750),i=s.create(t,0,"item");i.setVelocity(0,200),i.setCollideWorldBounds(!0),i.setBounce(1)}}),this.physics.add.collider(i,s,c,null,this),o=this.input.keyboard.createCursorKeys()},update:function(){o.left.isDown?i.setVelocityX(-300):o.right.isDown?i.setVelocityX(300):i.setVelocityX(0),s.children.iterate((e=>{e.y>600&&e.destroy()}))}}};let i,s,o;new e.Game(t);let r,n=0;function c(e,t){t.destroy(),n+=10,r.setText(`Score: ${n}`)}
