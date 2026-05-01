import React from "react";

const PlantAnimation = ({ moisture }) => {
  return (
    <div className="plant-wrapper">
      <style>{`
        .plant-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 350px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #fdfbf7; /* Soft paper background */
          border-radius: 20px;
          padding: 20px;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
        }

        .scene {
          position: relative;
          width: 140px;
          height: 220px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        /* --- KEYFRAMES FOR AMBIENT MOTION --- */
        @keyframes gentleSway {
          0% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(2deg) translateY(-2px); }
          100% { transform: rotate(-2deg) translateY(0px); }
        }

        @keyframes leafFlutterLeft {
          0% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-40deg) scale(1.02); }
          100% { transform: rotate(-45deg) scale(1); }
        }

        @keyframes leafFlutterRight {
          0% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(50deg) scale(1.02); }
          100% { transform: rotate(45deg) scale(1); }
        }

        @keyframes flowerBob {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }

        @keyframes blink {
          0%, 96%, 100% { height: 4px; }
          98% { height: 1px; }
        }

        /* --- THE POT --- */
        .pot-container {
          position: relative;
          z-index: 10;
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.15));
        }

        .pot {
          width: 90px;
          height: 80px;
          background: #795548;
          border-bottom-left-radius: 25px;
          border-bottom-right-radius: 25px;
          position: relative;
          overflow: hidden;
        }
        
        /* Pot Pattern */
        .pot::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          width: 100%;
          height: 20px;
          background: rgba(255,255,255,0.1);
        }

        .pot-rim {
          width: 100px;
          height: 18px;
          background: #8d6e63;
          border-radius: 10px;
          position: absolute;
          top: -10px;
          left: -5px;
        }

        /* Cute Face on Pot */
        .face {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.8;
        }
        
        .eyes {
          display: flex;
          gap: 25px;
        }
        
        .eye {
          width: 8px;
          height: 4px;
          background: #3e2723;
          border-radius: 50%;
          animation: blink 4s infinite;
        }

        .mouth {
          width: 12px;
          height: 6px;
          border-radius: 0 0 12px 12px;
          border: 2px solid #3e2723;
          border-top: 0;
          margin-top: 4px;
        }

        /* --- THE PLANT --- */
        .plant-base {
          position: absolute;
          bottom: 70px;
          left: 50%;
          width: 0;
          height: 0;
          z-index: 5;
        }

        /* Main Stem Group - Anchors the whole plant movement */
        .plant-stem-group {
          position: absolute;
          bottom: 0;
          left: -4px; /* Center the 8px stem */
          width: 8px;
          height: 140px;
          transform-origin: bottom center;
          animation: gentleSway 5s ease-in-out infinite;
        }

        .stem {
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, #2e7d32, #66bb6a);
          border-radius: 8px;
          position: relative;
        }

        /* Leaves */
        .leaf {
          position: absolute;
          background: #4caf50;
          width: 40px;
          height: 25px;
          border-radius: 0 50% 50% 50%;
          box-shadow: inset 2px -2px 5px rgba(0,0,0,0.1);
        }

        .leaf-1 {
          bottom: 30px;
          left: -35px;
          transform-origin: bottom right;
          border-radius: 50% 0 50% 50%;
          animation: leafFlutterLeft 3s ease-in-out infinite alternate;
        }

        .leaf-2 {
          bottom: 60px;
          right: -35px;
          transform-origin: bottom left;
          animation: leafFlutterRight 3.5s ease-in-out infinite alternate;
        }

        .leaf-3 {
          bottom: 90px;
          left: -30px;
          width: 30px;
          height: 20px;
          transform-origin: bottom right;
          border-radius: 50% 0 50% 50%;
          animation: leafFlutterLeft 4s ease-in-out infinite alternate;
        }

        /* Flower Head */
        .flower-head {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          animation: flowerBob 3s ease-in-out infinite;
        }

        .petals {
          width: 100%;
          height: 100%;
          background: #ffeb3b;
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 15px rgba(255, 235, 59, 0.6);
        }
        
        .petals::before, .petals::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: #ffeb3b;
          border-radius: 50%;
          left: 0;
          top: 0;
        }
        
        .petals::before { transform: rotate(60deg); }
        .petals::after { transform: rotate(-60deg); }

        .disk {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: #ff9800;
          border-radius: 50%;
          z-index: 2;
          box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2);
        }

        /* Data Display */
        .status-card {
          margin-top: 20px;
          background: white;
          padding: 8px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          text-align: center;
          transition: transform 0.2s;
        }
        
        .status-card:hover {
          transform: scale(1.05);
        }

        .label { font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 1.5rem; font-weight: 800; color: #2e7d32; }

      `}</style>

      <div className="scene">
        
        <div className="plant-base">
          <div className="plant-stem-group">
            <div className="stem"></div>
            
            <div className="leaf leaf-1"></div>
            <div className="leaf leaf-2"></div>
            <div className="leaf leaf-3"></div>

            <div className="flower-head">
              <div className="petals"></div>
              <div className="disk"></div>
            </div>
          </div>
        </div>

        <div className="pot-container">
          <div className="pot-rim"></div>
          <div className="pot">
            {/* A cute minimalist face */}
            <div className="face">
              <div className="eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
              <div className="mouth"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlantAnimation;