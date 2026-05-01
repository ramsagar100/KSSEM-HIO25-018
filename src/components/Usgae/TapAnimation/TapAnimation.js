import React from "react";

const TapAnimation = ({ flowRate }) => {
  // Convert prop to number to check if flowing
  const isFlowing = flowRate && Number(flowRate) > 0;

  return (
    <div className="tap-wrapper">
      <style>{`
        .tap-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 350px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #fdfbf7; /* Same soft paper background */
          border-radius: 20px;
          padding: 20px;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
        }

        .scene {
          position: relative;
          width: 160px;
          height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        /* --- ANIMATIONS --- */
        @keyframes flowMotion {
          0% { background-position: 0 0; }
          100% { background-position: 0 20px; }
        }

        @keyframes drip {
          0% { transform: translateY(-10px) scale(1); opacity: 1; }
          60% { transform: translateY(10px) scale(0.8); opacity: 1; }
          100% { transform: translateY(30px) scale(0.5); opacity: 0; }
        }

        @keyframes splash {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes blink {
          0%, 96%, 100% { height: 4px; }
          98% { height: 1px; }
        }

        /* --- THE FAUCET --- */
        .faucet-group {
          position: relative;
          width: 100px;
          height: 60px;
          z-index: 20;
          margin-left: 40px; /* Offset to center spout over bucket */
        }

        .pipe-horizontal {
          position: absolute;
          top: 10px;
          right: 0;
          width: 80px;
          height: 25px;
          background: linear-gradient(to bottom, #cfd8dc, #90a4ae);
          border-radius: 4px;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        }

        .pipe-vertical {
          position: absolute;
          top: 10px;
          left: 0;
          width: 25px;
          height: 50px;
          background: linear-gradient(to right, #b0bec5, #78909c);
          border-radius: 4px 4px 10px 10px;
          box-shadow: inset -2px -2px 5px rgba(0,0,0,0.1);
        }

        .spout-ring {
          position: absolute;
          bottom: -5px;
          left: -2px;
          width: 29px;
          height: 8px;
          background: #546e7a;
          border-radius: 4px;
        }

        .handle {
          position: absolute;
          top: 0px;
          right: 10px;
          width: 15px;
          height: 25px;
          background: #78909c;
          border-radius: 2px;
          transform-origin: bottom center;
          transition: transform 0.3s ease;
        }

        .handle-top {
          position: absolute;
          top: 0;
          left: -12px;
          width: 40px;
          height: 8px;
          background: #546e7a;
          border-radius: 4px;
        }

        /* Rotate handle when flowing */
        .faucet-group.flowing .handle {
          transform: rotate(-15deg);
        }

        /* --- THE WATER --- */
        .water-flow {
          position: absolute;
          top: 55px; /* End of spout */
          left: 5px; /* Center of spout */
          width: 15px;
          height: 0;
          background: rgba(41, 182, 246, 0.6);
          /* Stripe pattern to show motion */
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.3) 0,
            rgba(255,255,255,0.3) 5px,
            transparent 5px,
            transparent 10px
          );
          transition: height 0.3s ease-in;
          z-index: 5;
        }

        .water-flow.active {
          height: 110px; /* Reach the bucket */
          animation: flowMotion 1s linear infinite;
        }

        /* Drip animation when not fully flowing but "wet" */
        .drip {
          position: absolute;
          top: 55px;
          left: 8px;
          width: 8px;
          height: 8px;
          background: #29b6f6;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          opacity: 0;
        }

        .faucet-group:not(.flowing) .drip {
          animation: drip 2s infinite;
        }

        /* Splash Effect */
        .splash-zone {
          position: absolute;
          bottom: 70px;
          left: 45px;
          width: 30px;
          height: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 15;
        }

        .splash-drop {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #4fc3f7;
          border-radius: 50%;
          opacity: 0;
        }

        .faucet-group.flowing ~ .splash-zone .splash-drop:nth-child(1) {
          animation: splash 0.6s infinite 0.1s;
          left: 0;
        }
        .faucet-group.flowing ~ .splash-zone .splash-drop:nth-child(2) {
          animation: splash 0.6s infinite 0.3s;
          right: 0;
        }

        /* --- THE BUCKET --- */
        .bucket-container {
          position: relative;
          z-index: 10;
          animation: float 4s ease-in-out infinite;
        }

        .bucket {
          width: 80px;
          height: 70px;
          background: #f48fb1; /* Pink bucket */
          border-radius: 10px 10px 25px 25px;
          position: relative;
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .bucket-rim {
          position: absolute;
          top: 0;
          left: -5px;
          width: 90px;
          height: 10px;
          background: #ec407a;
          border-radius: 5px;
        }

        .bucket-handle {
          position: absolute;
          top: -25px;
          left: 10px;
          width: 60px;
          height: 30px;
          border: 4px solid #b0bec5;
          border-bottom: 0;
          border-radius: 30px 30px 0 0;
          z-index: -1;
        }

        /* Water inside bucket */
        .bucket-water {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%; /* Static level for animation sake */
          background: rgba(41, 182, 246, 0.4);
          transform-origin: bottom;
          transition: height 0.5s ease;
        }
        
        /* Surface ripple */
        .bucket-water::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
        }

        /* Face on Bucket */
        .face {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.8;
        }

        .eyes { display: flex; gap: 20px; }
        .eye {
          width: 6px;
          height: 6px;
          background: #880e4f;
          border-radius: 50%;
          animation: blink 4s infinite;
        }
        
        .mouth {
          width: 8px;
          height: 4px;
          border-radius: 0 0 8px 8px;
          border: 2px solid #880e4f;
          border-top: 0;
          margin-top: 4px;
        }

        /* --- CARD --- */
        .status-card {
          margin-top: 10px;
          background: white;
          padding: 8px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          text-align: center;
          transition: transform 0.2s;
        }
        .status-card:hover { transform: scale(1.05); }
        .label { font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 1.5rem; font-weight: 800; color: #0288d1; }

      `}</style>

      <div className="scene">
        
        <div className={`faucet-group ${isFlowing ? 'flowing' : ''}`}>
          <div className="pipe-horizontal">
            <div className="handle">
              <div className="handle-top"></div>
            </div>
          </div>
          <div className="pipe-vertical">
            <div className="spout-ring"></div>
          </div>
          
          {/* Water Stream */}
          <div className={`water-flow ${isFlowing ? 'active' : ''}`}></div>
          <div className="drip"></div>
        </div>

        <div className="splash-zone">
          <div className="splash-drop"></div>
          <div className="splash-drop"></div>
        </div>

        <div className="bucket-container">
          <div className="bucket-handle"></div>
          <div className="bucket-rim"></div>
          <div className="bucket">
            {/* Water inside bucket rises slightly when flowing */}
            <div className="bucket-water" style={{ height: isFlowing ? '70%' : '50%' }}></div>

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

export default TapAnimation;