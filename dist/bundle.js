!function(e){var l={};function t(n){if(l[n])return l[n].exports;var o=l[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=l,t.d=function(e,l,n){t.o(e,l)||Object.defineProperty(e,l,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,l){if(1&l&&(e=t(e)),8&l)return e;if(4&l&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&l&&"string"!=typeof e)for(var o in e)t.d(n,o,function(l){return e[l]}.bind(null,o));return n},t.n=function(e){var l=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(l,"a",l),l},t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)},t.p="",t(t.s=2)}([function(e,l,t){"use strict";var n;function o(e,l,t){return l in e?Object.defineProperty(e,l,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[l]=t,e}Object.defineProperty(l,"__esModule",{value:!0});var r=document.querySelector(".board"),C=r.getContext("2d"),i={GREEN:"CellType::Green",BLUE:"CellType::Blue",EMPTY:"CellType::Empty",RED:"CellType::Red",YELLOW:"CellType::Yellow"},y={BOARD_HEIGHT:r.height,BOARD_WIDTH:r.width,ROW_COUNT:15,COLUMN_COUNT:15,cellOffset:0},p={CellFillColorMap:(n={},o(n,i.GREEN,"#00FF00"),o(n,i.BLUE,"#0000FF"),o(n,i.EMPTY,"#FFFFFF"),o(n,i.RED,"#FF0000"),o(n,i.YELLOW,"#FFFF00"),n),BoundaryColor:"#000000"};l.canvas=r,l.CellType=i,l.colors=p,l.context=C,l.dimensions=y},function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),l.getUUID=l.getContext=l.getCellWidth=l.getCellHeight=l.getCellColor=l.getCanvas=void 0;var n=t(0),o=n.dimensions.BOARD_HEIGHT,r=n.dimensions.BOARD_WIDTH,C=n.dimensions.ROW_COUNT,i=n.dimensions.COLUMN_COUNT;l.getCanvas=function(){return document.querySelector(".board")},l.getCellColor=function(e){return n.colors.CellFillColorMap[e]},l.getCellHeight=function(){return o/C},l.getCellWidth=function(){return r/i},l.getContext=function(e){return e.getContext("2d")},l.getUUID=function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)})}},function(e,l,t){"use strict";var n=t(3);window.onload=function(){(0,n.clearCanvas)(),(0,n.renderBoard)()}},function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),l.renderBoard=l.clearCanvas=void 0;var n=t(0),o=t(1),r=t(4),C=n.dimensions.ROW_COUNT,i=n.dimensions.COLUMN_COUNT,y=n.dimensions.BOARD_HEIGHT,p=n.dimensions.BOARD_WIDTH,E=function(e,l,t,o,r){n.context.beginPath(),n.context.lineWidth=1,n.context.strokeStyle=n.colors.BoundaryColor,n.context.strokeRect(e,l,t,o),n.context.beginPath(),n.context.fillStyle=r,n.context.fillRect(e,l,t,o)},a=function(e,l,t){n.context.drawImage(document.getElementById("safeStar"),e+5,l+5,t-10,t-10)};l.clearCanvas=function(){n.canvas.width=n.canvas.width,n.canvas.height=n.canvas.height},l.renderBoard=function(){for(var e=(0,o.getCellHeight)(),l=(0,o.getCellWidth)(),t=(0,r.getBoardMask)(),T=(0,r.getSafeZoneMask)(),u=0,c=0;c<C;c++){for(var s=0,d=0;d<i;d++)E(s,u,l,e,(0,o.getCellColor)(t[c][d])),T[c][d]&&a(s,u,l,(0,o.getCellColor)(t[c][d])),s+=l;u+=e}n.context.beginPath(),n.context.lineWidth=10,n.context.strokeStyle=n.colors.BoundaryColor,n.context.strokeRect(0,0,p,y),n.context.beginPath(),n.context.lineWidth=5,n.context.strokeStyle=n.colors.BoundaryColor,n.context.strokeRect(2*e,2*l,p-4*l,y-4*e)}},function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0}),l.getSafeZoneMask=l.getBoardMask=void 0;var n=t(0),o=n.dimensions.ROW_COUNT,r=n.dimensions.COLUMN_COUNT;l.getBoardMask=function(){for(var e=[],l=0;l<o;l++){for(var t=[],C=0;C<r;C++)t.push(n.CellType.EMPTY);e.push(t)}var i=0,y=0;return e[i+=2][y+=2]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=2]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,y=0,e[i+=1][y+=2]=n.CellType.GREEN,e[i][y+=3]=n.CellType.GREEN,e[i][y+=2]=n.CellType.BLUE,e[i][y+=2]=n.CellType.BLUE,e[i][y+=3]=n.CellType.BLUE,y=0,e[i+=1][y+=2]=n.CellType.GREEN,e[i][y+=3]=n.CellType.GREEN,e[i][y+=2]=n.CellType.BLUE,e[i][y+=2]=n.CellType.BLUE,e[i][y+=3]=n.CellType.BLUE,y=0,e[i+=1][y+=2]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=2]=n.CellType.BLUE,e[i][y+=2]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,e[i][y+=1]=n.CellType.BLUE,y=0,e[i+=1][y+=2]=n.CellType.GREEN,e[i][y+=5]=n.CellType.BLUE,y=0,e[i+=1][y+=2]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=1]=n.CellType.GREEN,e[i][y+=2]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,y=0,e[i+=1][y+=7]=n.CellType.RED,e[i][y+=5]=n.CellType.YELLOW,y=0,e[i+=1][y+=2]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=2]=n.CellType.RED,e[i][y+=2]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,y=0,e[i+=1][y+=2]=n.CellType.RED,e[i][y+=3]=n.CellType.RED,e[i][y+=2]=n.CellType.RED,e[i][y+=2]=n.CellType.YELLOW,e[i][y+=3]=n.CellType.YELLOW,y=0,e[i+=1][y+=2]=n.CellType.RED,e[i][y+=3]=n.CellType.RED,e[i][y+=2]=n.CellType.RED,e[i][y+=2]=n.CellType.YELLOW,e[i][y+=3]=n.CellType.YELLOW,y=0,e[i+=1][y+=2]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=1]=n.CellType.RED,e[i][y+=2]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e[i][y+=1]=n.CellType.YELLOW,e},l.getSafeZoneMask=function(){for(var e=[],l=0;l<o;l++){for(var t=[],n=0;n<r;n++)t.push(!1);e.push(t)}var C=0,i=0;return e[C+=2][i+=7]=!0,e[C][i+=1]=!0,i=0,e[C+=1][i+=7]=!0,i=0,e[C+=1][i+=6]=!0,e[C][i+=1]=!0,i=0,e[C+=1][i+=7]=!0,i=0,e[C+=1][i+=2]=!0,e[C][i+=5]=!0,e[C][i+=3]=!0,i=0,e[C+=1][i+=2]=!0,e[C][i+=1]=!0,e[C][i+=1]=!0,e[C][i+=1]=!0,e[C][i+=1]=!0,e[C][i+=2]=!0,e[C][i+=1]=!0,e[C][i+=1]=!0,e[C][i+=1]=!0,e[C][i+=1]=!0,i=0,e[C+=1][i+=4]=!0,e[C][i+=3]=!0,e[C][i+=5]=!0,i=0,e[C+=1][i+=7]=!0,i=0,e[C+=1][i+=7]=!0,e[C][i+=1]=!0,i=0,e[C+=1][i+=7]=!0,i=0,e[C+=1][i+=6]=!0,e[C][i+=1]=!0,e}}]);
//# sourceMappingURL=bundle.js.map