//variables used (theres a lot of them!)
var buttonPress = 0;
var money = 0;
var totalEarnings = 0;
var multiplier = 1;
var multiplierCost = 60;
var clickPower = 1;
var clickCost = 100;
var assistant = 0;
var assistantCost = 100;
var assistantPower = 1;
var powerCost = 250;
var idleNumber = 0;
var superUpgrade = 0;
var superCost = 1000;
var superColor = color(42, 209, 0);
var superStroke = color(26, 71, 0);
var superBackground = color(140, 255, 247);
var superClickColors = [color(40, 173, 0), color(32, 87, 0), color(191, 194, 0), color(89, 92, 0)];
var x = 1;
var y = 0;

//DEBUG USE ONLY!
var cheatCost = 1;
var cheatAmount = 10000;
var cheatButtonEnabled = 0;

var accensionPoints = 0;
var accensionEarn = 0;
var accensionCostNum = 10000;
var accensionCount = 0;
var gameTime = 0;
var accensionTime = 0;
var reset = function() {
    money = 0;
    totalEarnings = 0;
    multiplier = 1;
    multiplierCost = 60;
    clickPower = 1;
    clickCost = 500;
    assistant = 0;
    assistantCost = 100;
    assistantPower = 1;
    powerCost = 500;
    idleNumber = 0;
    superUpgrade = 1;
    superCost = 1000;
    superColor = color(42, 209, 0);
    superStroke = color(26, 71, 0);
    superBackground = color(140, 255, 247);
    x = 1;
    y = 0;
    cheatCost = 1;
    cheatAmount = 10000;
    cheatButtonEnabled = 0;
    accensionEarn = 0;
    accensionCostNum = 10000 + (accensionCostNum * accensionPoints);
    accensionTime = 0;
};

//accension upgrade variables
var clickPowerAP = 1;
var clickAPCost = 5;
var assistantPowerAP = 1;
var powerAPCost = 5;
var discount = 0;
var discountCost = 3;
var discountPrecent = 0;

//all the code that makes up this game :)
draw = function() {
     //this will round the discounted costs
     multiplierCost = round(multiplierCost);
     clickCost = round(clickCost);
     assistantCost = round(assistantCost);
     powerCost = round(powerCost);
     superCost = round(superCost);
     
     //currentScene = 1;
     background(superBackground);
     
     //left cloud
     stroke(250, 250, 250);
     fill(250, 250, 250);
     ellipse(40, 365, 150, 150);
     
     stroke(248, 248, 248);
     fill(248, 248, 248);
     ellipse(120, 395, 100, 100);
     
     //right cloud
     stroke(250, 250, 250);
     fill(250, 250, 250);
     ellipse(460, 365, 150, 150);
     
     stroke(248, 248, 248);
     fill(248, 248, 248);
     ellipse(380, 395, 100, 100);
     
     //ground-ish
     stroke(240, 240, 240);
     fill(240, 240, 240);
     rect(0, 380, 500, 20);
    
    var earnMoney = round(buttonPress);

     //checks to see if user has clicked on the button
     if (mouseIsPressed && mouseX > 200 && mouseX < 300 && mouseY > 150 && mouseY < 250) {
        
        //if the button is pressed, it will add $1 per second, and change color
        stroke(superClickColors[x]);
        buttonPress += (0.0166666666667 * multiplier) * clickPower;
        
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text("+$" + earnMoney + "!", 125, -10, 250, 250);
        
        fill(superClickColors[y]);
     } else {
         fill(0, 0, 0);
         textAlign(CENTER, CENTER);
         text("$" + money, 245, 270);
         totalEarnings += earnMoney;
         money += earnMoney;
         buttonPress = 0;
         stroke(superStroke);
         fill(superColor);
     }
    
    //draws the button
    rect(200, 150, 100, 100);
    strokeWeight(3);
    
    //this will add 1 to the multiplier when the button is pressed.

    if (mouseIsPressed && mouseX > 15 && mouseX < 65 && mouseY > 325 && mouseY < 375) {
            stroke(0, 35, 59);
            fill(0, 86, 143);
            if (money >= multiplierCost) {
                
                multiplier ++;
                money -= multiplierCost;
                multiplierCost += round(multiplierCost * 0.1);
                multiplierCost -= (multiplierCost * discount);
            }
            
    } else {
        stroke(0, 56, 94);
        fill(0, 121, 207);
    }
    
    //draws the multiplier button
    rect(15, 325, 50, 50);
    
    //displays multiplier button text
    fill(255, 255, 255);
    textSize(30);
    text("X", 21, 320, 40, 50);

    //if you have enough funds, this will add +$1 per second while holding down the button
    if (multiplier >= 2) {
        if (mouseIsPressed && mouseX > 80 && mouseX < 130 && mouseY > 325 & mouseY < 375) {
                stroke(0, 14, 23);
                fill(0, 60, 97);
                if (money >= clickCost) {
                    clickPower += clickPowerAP;
                    money -= clickCost;
                    clickCost += round(clickCost * 1.15);
                }
        } else {
            stroke(0, 34, 56);
            fill(0, 89, 148);
        }
        
        //draws the click power button
        rect(80, 325, 50, 50);
        
        fill(255, 255, 255);
        textSize(20);
        text("PWR", 85, 320, 40, 50);   
    }
    
    if (multiplier >= 3 && clickPower >= 3) {
    
        //detects if the assistant button is pushed, and if so, will add +1 assistant
        if (mouseIsPressed && mouseX > 325 && mouseX < 385 && mouseY > 325 && mouseY < 375) {
                stroke(59, 0, 58);
                fill(179, 0, 176);
            if (money >= assistantCost) {
                assistant++;
                money -= assistantCost;
                assistantCost += round(assistantCost * 0.75);
            }
        } else {
            stroke(105, 0, 103);
            fill(255, 0, 247);
        }
    
    //this controls the idle portion of the game.
        var idleEarnings = round(idleNumber);
    
        if (idleNumber < 1) {
            idleNumber += (0.0166666666667 * assistant) * assistantPower;
            
        } else if (idleEarnings === 1) {
            totalEarnings += idleEarnings;
            money += idleEarnings;
            idleNumber = 0;
        } else if (idleEarnings > 1) {
            totalEarnings += idleEarnings;
            money += idleEarnings;
            idleNumber = (0.0166666666667 * assistant) * assistantPower;
        }
    
    //draws the assistant button
        rect (335, 325, 50, 50);
        
        fill(255, 255, 255);
        textSize(20);
        text("AST", 341, 320, 40, 50);
    }

    if (assistant >= 1) {

    //detects if you have pressed the power button, and if enough money, will add +1 power
        if (mouseIsPressed && mouseX > 270 && mouseX < 320 && mouseY > 325 && mouseY < 375) {
            stroke(31, 0, 31);
            fill(102, 0, 100);
            if (money >= powerCost) {
                assistantPower += assistantPowerAP;
                money -= powerCost;
                powerCost += round(powerCost * 1.5);
            }
        } else {
            stroke(71, 0, 70);
            fill(168, 0, 165);
        }
        
        //draws the assistant power button
        rect(270, 325, 50, 50);
        
        fill(255, 255, 255);
        textSize(18);
        text("AST PWR", 276, 316, 40, 60);    
    }
    
    if (assistant >= 3 && assistantPower >= 1 && multiplier >= 10 && clickPower >= 6) {
        
        //if enough money, will DOULBE multiplier and assistantPower!
        if (mouseIsPressed && mouseX > 150 && mouseX < 250 && mouseY > 325 && mouseY < 375) {
            stroke(97, 99, 0);
            fill(166, 181, 0);
            if (money >= superCost) {
                superUpgrade++;
                money -= superCost;
                superCost += (superCost * 2.5);
                multiplier *= superUpgrade;
                assistantPower *= superUpgrade;
            }
        } else {
            stroke(153, 156, 0);
            fill(230, 255, 0);
        }
        
        //draws super upgrade button
        rect(150, 325, 100, 50);
        
        fill(0, 0, 0);
        textSize(25);
        text("SUPER", 150, 320, 100, 50);
    
        //detects if super upgrade is bought, and if so will change button to gold
        if (superUpgrade >= 2) {
        superColor = color(247, 255, 0);
        superStroke = color(143, 148, 0);
        x = 3;
        y = 2;
        superBackground = color(239, 250, 142);
        }
    }

    if (cheatButtonEnabled === 1) {
        if (mouseIsPressed && mouseX > 440 && mouseX < 490 && mouseY > 10 && mouseY < 60) {
            stroke(112, 0, 0);
            fill(163, 0, 0, 150);
            if (money >= cheatCost) {
                money -= cheatCost;
                money += cheatAmount;
                cheatButtonEnabled = 0;
            }
        } else {
            stroke(196, 0, 0);
            fill(252, 0, 0, 150);
        }
        
        //draws the cheat button
        rect(440, 10, 50, 50);
    }

    var accensionCost = round(accensionCostNum);
    
    if (totalEarnings >= 10000) {
        
        //this will calculate how much money earned is needed to gain +1 AP    
        if (totalEarnings >= accensionCost) {
            accensionCostNum += (accensionCostNum * 0.25) + 1000;
            accensionEarn++;
        }
        
        //this will reset the run but will give the player AP points
        if (mouseIsPressed && mouseX > 400 && mouseX < 485 && mouseY > 325 && mouseY < 375) {
            if (accensionEarn < 1) {
                fill(255, 0, 0);
                text("You need atleast 1 AP to accend!", 160, 20, 250, 150);
            } else {
            accensionPoints += accensionEarn;
            accensionCount++;
            reset();
            }
            stroke(7, 18, 0, 200);
            fill(30, 140, 0, 200);
        } else {
            stroke(26, 71, 0, 200);
            fill(42, 209, 0, 200);
        }
        
        //draws the accension button
        rect(400, 325, 85, 50);
    }
 
    //if you have enough AP, this will add +1 to the click power upgrade    
    if (accensionCount >= 1) {
        if (mouseIsPressed && mouseX > 435 && mouseX < 485 && mouseY > 240 && mouseY < 290) {
            stroke(255, 238, 0);
            fill(0, 60, 97);
            if (accensionPoints >= clickAPCost) {
                accensionPoints -= clickAPCost;
                clickPowerAP++;
                clickAPCost += round(clickAPCost * 1.5);
            }
        } else {
            stroke(255, 238, 0);
            fill(0, 89, 148);
        }
        
        //draws the Click Power AP button
        rect(435, 240, 50, 50);
    
        if (mouseIsPressed && mouseX > 435 && mouseX < 485 && mouseY > 175 && mouseY < 225) {
            stroke(255, 238, 0);
            fill(102, 0, 100);
            if (accensionPoints >= powerAPCost) {
                accensionPoints -= powerAPCost;
                assistantPowerAP++;
                powerAPCost += round(powerAPCost * 1.5);
            }
        } else {
            stroke(255, 238, 0);
            fill(168, 0, 165);
        }
        
        //draws the Assistant Power AP button
        rect(435, 175, 50, 50);
     
        if (mouseIsPressed && mouseX > 435 && mouseX < 485 && mouseY > 110 && mouseY < 160) {
            stroke(255, 238, 0);
            fill(196, 105, 0);
            if (accensionPoints >= discountCost) {
                accensionPoints -= discountCost;
                discount += 0.05;
                discountPrecent += 5;
                discountCost += round(discountCost * 1.5);
                
                //this will subtract the costs by the discount
                multiplierCost -= (multiplierCost * discount);
                clickCost -= (clickCost * discount);
                assistantCost -= (assistantCost * discount);
                powerCost -= (powerCost * discount);
                superCost -= (superCost * discount);
            }
            
        } else {
            stroke(255, 238, 0);
            fill(255, 136, 0);
        }
        
        //draws the Cost Discount button
        rect(435, 110, 50, 50);
    }
    
    //All the text that isnt in a loop/function
    fill(0, 0, 0);
        //click text
    textSize(24);
    textAlign(LEFT, LEFT);
    text("Click!", 219, 180, 53, 80);
    
        //multiplier amount
    textAlign(CENTER, CENTER);
    text("x" + multiplier, 222, 175, 53, 80);
    textAlign(LEFT, LEFT);

        //the run times, game and accension
    var gameRun = round(gameTime);
    var accensionRun = round(accensionTime);
    
    gameTime += 0.0166666666667;
    accensionTime += 0.0166666666667;
    
    textSize(17); 
    text("Time (This Run): " + accensionRun + " sec", 5, 5, 200, 200);
    text("Time (Total): " + gameRun + " sec", 5, 25, 200, 200);
    
    if (assistant >= 1) {
            //displays assistant stats
        textSize(17);
        fill(0, 0, 0);
        text("Assistants: " + assistant, 5, 105, 200, 200);
        text("Amount: $" + assistantPower, 5, 125, 200, 200);
        text("Generating $" + (assistantPower * assistant) + "/s", 5, 145, 200, 200);
    }
    
        //displays clicking stats
    text("Click Power: $" + clickPower, 5, 65, 200, 200);
    text("Click speed: $" + (multiplier * clickPower) + "/s", 5, 85, 200, 200);
    
        if (superUpgrade >= 1) {
            //displays super stats
        text("SuperMultiplier: x" + superUpgrade, 5, 165, 200, 200);
        }
    
        //displays total earnings
    text("Total Earnings: $" + totalEarnings, 5, 45, 200, 200);
        
        //extra accension stats unlocked after accending atleast once
    if (accensionCount >= 1) {
      text("Accension Points: " + accensionPoints, 5, 185, 200, 200);
      if (discount >= 0.05) {
          text("Discount: " + discountPrecent + "%", 5, 205, 200, 200);
        }
    }
        
    if (totalEarnings >= 10000) {
        
            //accension gain text
        text("+" + accensionEarn + " AP", 420, 345, 200, 200);
    }
    
    //this will display multiplier info when hovering over button
    if (mouseX > 15 && mouseX < 65 && mouseY > 325 && mouseY < 375) {
        textSize(20);
        text("+1 Multiplier ($" + multiplierCost + ")", 220, 30, 200, 150);
        text("(Hold to buy multiple)", 210, 55, 200, 150);
        textSize(14);
        text("Click Multiplier", 5, 305, 200, 200);
    }
    
    if (multiplier >= 2) {
    
        //this will display click power info when hovering over button
        if (mouseX > 80 && mouseX < 130 && mouseY > 325 & mouseY < 375) {
            textSize(20);
            text("+$" + clickPowerAP + "/click on button ($" + clickCost + ")", 170, 30, 250, 150);
            text("(Hold to buy multiple)", 210, 55, 200, 150);
            textSize(14);
            text("Click Power", 65, 305, 200, 200);
        }
    }
    
    if (multiplier >= 3 && clickPower >= 3) {
    
        //this will display assistant info when hovering over button
        if (mouseX > 325 && mouseX < 385 && mouseY > 325 && mouseY < 375) {
            textSize(20);
            text("+1 Assistant ($" + assistantCost + ")", 210, 30, 200, 150);
            text("(Hold to buy multiple)", 210, 55, 200, 150);
            textSize(14);
            text("Assistants", 330, 305, 200, 200);
        }
    }
    
    if (assistant >= 1) {
       
        //this will display assistant power info when hovering over button
        if (mouseX > 270 && mouseX < 320 && mouseY > 325 && mouseY < 375) {
            textSize(20);
            text("+$" + assistantPowerAP + " per assistant ($" + powerCost + ")", 190, 30, 250, 150);
            text("(Hold to buy multiple)", 210, 55, 200, 150);
            textSize(14);
            text("Assistant Power", 245, 305, 200, 200);
        }
    }
        
    if (assistant >= 3 && assistantPower >= 1 && multiplier >= 10 && clickPower >= 5) {
        
        //this will display super upgrade info when hovering over button
        if (mouseX > 150 && mouseX < 250 && mouseY > 325 && mouseY < 375) {
            textSize(20);
            text("x" + (superUpgrade + 1) + " EVERYTHING ($" + superCost + ")", 175, 30, 250, 150);
            text("(Hold to buy multiple)", 210, 55, 200, 150);
            textSize(14);
            text("SUPER UPGRADE", 140, 305, 200, 200);
        }
    }
    
    //this will display cheat button info when hovering over button
    if (cheatButtonEnabled === 1) {
        if (mouseX > 439 && mouseX < 490 && mouseY > 10 && mouseY < 60) {
            textSize(20);
            text("+$10000. ONE TIME USE ONLY! ($" + cheatCost + ")", 160, 40, 200, 150);
            textSize(14);
            text("Cheat Button", 350, 35, 200, 200);
        }
    }
    
    if (totalEarnings >= 10000) {
        
        //this will display AP info when hovering over button
        if (mouseX > 400 && mouseX < 485 && mouseY > 325 && mouseY < 375) {
            textSize(18);
            text("Gain an Accension Point (AP) at $" + accensionCost + " total earnings!", 190, 30, 250, 150);
            textSize(14);
            text("Accension", 410, 305, 200, 200);
        }
    }
    
    if (accensionCount >= 1) {
        //this will display click AP info when hoering over button
        if (mouseX > 435 && mouseX < 485 && mouseY > 240 && mouseY < 290) {
            textSize(20);
            text("Adds +1 to the Click Power Upgrade (" + clickAPCost + " AP)", 185, 30, 250, 150);
            textSize(14);
            text("AP Click Power", 330, 260, 200, 200);
        }
        
        //this will display assistant power AP info when hovering over button
        if (mouseX > 435 && mouseX < 485 && mouseY > 175 && mouseY < 225) {
            textSize(20);
            text("Adds +1 to the Assistant Power Upgrade (" + powerAPCost + " AP)", 205, 30, 250, 150);
            textSize(14);
            text("AP Assistant Power", 305, 195, 200, 200);
        }
        
        //this will display cost discount info when hovering over button
        if (mouseX > 435 && mouseX < 485 && mouseY > 110 && mouseY < 160) {
            textSize(20);
            text("Cuts all money prices by +5% (" + discountCost + " AP)", 205, 30, 250, 150);
            textSize(14);
            text("Money Discount", 325, 135, 200, 200);
        }
    } 
    
    textSize(24);
    
};