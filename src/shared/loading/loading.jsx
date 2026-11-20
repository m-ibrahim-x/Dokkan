
import "./loading.css";

const Loading = () => {
    return (
        <main
        className="dokkan-loading"
        role="status"
        aria-label="Loading"
        >
        {/* Background Decorations */}
        <div className="loading-decoration loading-decoration-top">
            <svg viewBox="0 0 380 250" aria-hidden="true">
            <path
                d="M0 0H380C330 95 280 125 185 145C95 165 40 195 0 250Z"
                fill="#FCF4E4"
                opacity=".42"
            />
            <path
                d="M380 0C330 95 280 125 185 145C95 165 40 195 0 250"
                fill="none"
                stroke="#D9A441"
                strokeWidth="1.4"
            />
            </svg>
        </div>

        <div className="loading-decoration loading-decoration-bottom">
            <svg viewBox="0 0 400 270" aria-hidden="true">
            <path
                d="M400 0C300 25 280 110 190 155C110 195 50 205 0 270H400Z"
                fill="#FCF4E4"
                opacity=".42"
            />
            <path
                d="M400 100C320 125 300 210 200 235C115 255 55 250 0 270"
                fill="none"
                stroke="#D9A441"
                strokeWidth="1.4"
            />
            </svg>
        </div>

        {/* Main Content */}
        <section className="loading-content">

            {/* Shopping Bag Illustration */}
            <div className="loading-illustration">

            {/* Orbit behind the bag */}
            <div className="loading-orbit loading-orbit-back" />

            {/* Shopping Bag */}
            <svg
                className="loading-bag"
                viewBox="0 0 280 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                <linearGradient
                    id="bagGradient"
                    x1="45"
                    y1="50"
                    x2="230"
                    y2="210"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFD15B" />
                    <stop offset=".55" stopColor="#FFB52F" />
                    <stop offset="1" stopColor="#F18A0A" />
                </linearGradient>

                <linearGradient
                    id="bagSideGradient"
                    x1="205"
                    y1="80"
                    x2="245"
                    y2="200"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F79A12" />
                    <stop offset="1" stopColor="#E87908" />
                </linearGradient>

                <linearGradient
                    id="handleGradient"
                    x1="110"
                    y1="15"
                    x2="175"
                    y2="75"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#34383D" />
                    <stop offset="1" stopColor="#171A1D" />
                </linearGradient>

                <filter
                    id="bagShadow"
                    x="20"
                    y="35"
                    width="255"
                    height="220"
                    filterUnits="userSpaceOnUse"
                >
                    <feGaussianBlur stdDeviation="9" />
                </filter>
                </defs>

                {/* Handle */}
                <path
                d="M111 82V54C111 30 125 13 145 13C165 13 179 30 179 54V82"
                stroke="url(#handleGradient)"
                strokeWidth="13"
                strokeLinecap="round"
                />

                {/* Bag Shadow */}
                <path
                d="M65 65L207 74L238 204L94 215L42 193Z"
                fill="#B88322"
                opacity=".18"
                filter="url(#bagShadow)"
                />

                {/* Bag Side */}
                <path
                d="M199 65L220 74C229 77 234 85 235 96L246 205C247 217 238 225 226 224L201 222Z"
                fill="url(#bagSideGradient)"
                />

                {/* Bag Main Body */}
                <path
                d="M67 65C72 59 78 57 88 58L196 64C207 65 213 72 213 83L226 211C227 222 219 229 208 228L53 218C42 217 37 209 39 198L55 80C56 72 60 67 67 65Z"
                fill="url(#bagGradient)"
                />

                {/* Bag Highlight */}
                <path
                d="M72 70C77 66 84 66 91 67L187 72"
                stroke="#FFE49A"
                strokeWidth="3"
                strokeLinecap="round"
                opacity=".5"
                />

                {/* Shopping Cart Icon */}
                <g
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M80 111H94L101 160H159L176 125H98" />
                <path d="M113 143L122 151L132 140L143 150L153 139" />
                </g>

                {/* Cart Wheels */}
                <circle cx="105" cy="178" r="8" fill="white" />
                <circle cx="150" cy="178" r="8" fill="white" />
            </svg>

            {/* Orbit in front of the bag */}
            <div className="loading-orbit loading-orbit-front" />

            {/* Sparkles */}
            <span className="loading-sparkle loading-sparkle-left">✦</span>
            <span className="loading-sparkle loading-sparkle-right">✦</span>
            </div>

            {/* Brand */}
            <h1 className="loading-brand">Dokkan</h1>

            {/* Subtitle */}
            <p className="loading-message">
            Loading your experience...
            </p>

            {/* Animated Dots */}
            <div className="loading-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            </div>

        </section>
        </main>
    );
}

export default Loading;
