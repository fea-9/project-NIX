import React from 'react'

export const SettingsIcon = props => (
    <svg
        className="settings-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 13 13">
        <path
            d="M12.335,5.135l-.912-.155a5.152,5.152,0,0,0-.367-.885l.538-.752a.8.8,0,0,0-.087-1.035L10.7,1.5a.8.8,0,0,0-.568-.236.789.789,0,0,0-.464.149L8.91,1.95a5.1,5.1,0,0,0-.918-.377L7.84.671A.8.8,0,0,0,7.047,0H5.9a.8.8,0,0,0-.793.671l-.158.923a5.025,5.025,0,0,0-.883.372l-.747-.538a.8.8,0,0,0-1.035.087l-.812.809A.8.8,0,0,0,1.39,3.359l.543.763a5.033,5.033,0,0,0-.361.888l-.9.152A.8.8,0,0,0,0,5.955V7.1a.8.8,0,0,0,.671.793l.923.158a5.025,5.025,0,0,0,.372.883l-.535.744a.8.8,0,0,0,.087,1.035l.809.809a.8.8,0,0,0,.568.236.789.789,0,0,0,.464-.149l.763-.543a5.137,5.137,0,0,0,.858.353l.152.912A.8.8,0,0,0,5.926,13H7.072a.8.8,0,0,0,.793-.671l.155-.912A5.152,5.152,0,0,0,8.9,11.05l.752.538a.8.8,0,0,0,1.035-.087l.809-.809a.8.8,0,0,0,.087-1.035L11.05,8.9a5.115,5.115,0,0,0,.367-.885l.912-.152A.8.8,0,0,0,13,7.072V5.928A.793.793,0,0,0,12.335,5.135ZM6.5,8.571A2.072,2.072,0,1,1,8.573,6.5,2.073,2.073,0,0,1,6.5,8.571Z"
            transform="translate(0 0)"
        />
    </svg>
);

export const SearchIcon = ({className = "icon search-icon", props}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
    >
        <defs>
            <linearGradient
                id="search-icon"
                y1="0.504"
                x2="1"
                y2="0.504"
                gradientUnits="objectBoundingBox"
            >
                <stop offset="0" stopColor="#00f2fe"/>
                <stop offset="0.021" stopColor="#03effe"/>
                <stop offset="0.293" stopColor="#24d2fe"/>
                <stop offset="0.554" stopColor="#3cbdfe"/>
                <stop offset="0.796" stopColor="#4ab0fe"/>
                <stop offset="1" stopColor="#4facfe"/>
            </linearGradient>
        </defs>
        <path  d="M3.923-13.211A8.3,8.3,0,0,1,12.211-21.5,8.3,8.3,0,0,1,20.5-13.211a8.291,8.291,0,0,1-1.085,4.1,1.22,1.22,0,0,1-1.665.455,1.22,1.22,0,0,1-.455-1.665,5.847,5.847,0,0,0,.764-2.892,5.855,5.855,0,0,0-5.848-5.848,5.855,5.855,0,0,0-5.848,5.848,5.855,5.855,0,0,0,5.848,5.848,5.849,5.849,0,0,0,2.862-.747,1.22,1.22,0,0,1,1.662.465,1.22,1.22,0,0,1-.465,1.662,8.293,8.293,0,0,1-4.058,1.06A8.247,8.247,0,0,1,7.3-6.54L2.58-1.854a1.218,1.218,0,0,1-.86.354,1.218,1.218,0,0,1-.866-.36A1.22,1.22,0,0,1,.86-3.586L5.567-8.261A8.247,8.247,0,0,1,3.923-13.211Z"
               transform="translate(-0.5 21.5)"/>
    </svg>
);

export const DashboardIcon = ({className = "icon dashboard-icon", props}) => (
    <svg
        className = {className}
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="20"
        viewBox="0 0 25 20">
        <defs>
            <linearGradient
                id="dashboard-icon"
                x1="0.5"
                x2="0.5"
                y2="1"
                gradientUnits="objectBoundingBox"
            >
                <stop offset="0" stopColor="#03effe"/>
                <stop offset="1" stopColor="#4facfe"/>
            </linearGradient>
        </defs>
        <path
            d = "M21.247,56.276a.972.972,0,0,0-1.241-.117c-1.461,1-8.791,6.043-9.578,6.835a2.965,2.965,0,0,0,0,4.17,2.92,2.92,0,0,0,4.143,0c.788-.793,5.8-8.169,6.792-9.639A.988.988,0,0,0,21.247,56.276Zm-8.057,9.5a.973.973,0,0,1-1.381,0,.988.988,0,0,1,0-1.39c.306-.3,2.387-1.8,4.947-3.589C14.977,63.372,13.493,65.466,13.191,65.774ZM25,65.079a12.587,12.587,0,0,1-2.118,6.984.972.972,0,0,1-1.232.341L19.6,71.421a.986.986,0,0,1-.462-1.31.974.974,0,0,1,1.3-.465l1.259.6a10.64,10.64,0,0,0,.42-9.533.985.985,0,0,1,.488-1.3.974.974,0,0,1,1.292.491A12.551,12.551,0,0,1,25,65.079ZM5.809,70.1a.986.986,0,0,1-.45,1.314l-2,.983a.972.972,0,0,1-1.24-.337A12.61,12.61,0,0,1,3.661,56.183a12.45,12.45,0,0,1,13.977-2.576.985.985,0,0,1,.488,1.3.974.974,0,0,1-1.292.491,10.374,10.374,0,0,0-3.358-.89v1.479a.977.977,0,1,1-1.953,0V54.51A10.553,10.553,0,0,0,3.5,59.547l1.364.658a.984.984,0,0,1-.423,1.869.968.968,0,0,1-.422-.1L2.64,61.311A10.625,10.625,0,0,0,3.3,70.242L4.5,69.65A.974.974,0,0,1,5.809,70.1Z"
            transform="translate(0 -52.499)"
        />
    </svg>
);

export const DocumentsIcon = ({className = "icon documents-icon", props}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
    >
        <defs>
            <linearGradient
                id="documents-icon"
                y1="0.504"
                x2="1"
                y2="0.504"
                gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#00f2fe"/>
                <stop offset="0.021" stopColor="#03effe"/>
                <stop offset="0.293" stopColor="#24d2fe"/>
                <stop offset="0.554" stopColor="#3cbdfe"/>
                <stop offset="0.796" stopColor="#4ab0fe"/>
                <stop offset="1" stopColor="#4facfe"/>
            </linearGradient>
        </defs>
        <path  d="M20.8,16.6a4.192,4.192,0,0,0-3.231,1.52L14.3,16.5a.977.977,0,1,0-.87,1.749L16.7,19.873A4.2,4.2,0,1,0,20.8,16.6Zm0,6.445a2.246,2.246,0,0,1-2.072-3.113.987.987,0,0,0,.118-.24A2.246,2.246,0,1,1,20.8,23.047ZM9.867,14.272l-1.581-.8a4.216,4.216,0,0,0,0-1.921l9.289-4.658a4.179,4.179,0,1,0-.871-1.748L7.414,9.8a4.2,4.2,0,1,0-.01,5.409l1.577.8a.977.977,0,1,0,.886-1.741ZM20.8,1.953A2.246,2.246,0,1,1,18.555,4.2,2.249,2.249,0,0,1,20.8,1.953ZM4.2,14.746A2.246,2.246,0,1,1,6.445,12.5,2.249,2.249,0,0,1,4.2,14.746Z"/>
    </svg>
);

export const CommunityIcon = ({className="icon community-icon", props}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="25.513"
        height="17.355"
        viewBox="0 0 25.513 17.355"
    >
        <defs>
            <linearGradient
                id="community-icon"
                x1="0.5"
                x2="0.5"
                y2="1"
                gradientUnits="objectBoundingBox"
            >
                <stop offset="0" stopColor="#03effe" />
                <stop offset="1" stopColor="#4facfe" />
            </linearGradient>
        </defs>
        <path
            d="M18.336,16.855a.531.531,0,1,1,0-1.063h5.225a.368.368,0,0,0,.348-.481A3.387,3.387,0,0,0,20.69,13.02a3.273,3.273,0,0,0-1.887.593.532.532,0,0,1-.61-.873,4.445,4.445,0,0,1,.8-.442,2.378,2.378,0,0,1-.674-1.444,3.306,3.306,0,0,0-3.71-.588,8.574,8.574,0,0,1,2.206,4.175,2.009,2.009,0,0,1-.409,1.676,1.979,1.979,0,0,1-1.546.737H2A2,2,0,0,1,.043,14.439a.659.659,0,0,1,1.29.269.692.692,0,0,0,.139.578A.672.672,0,0,0,2,15.535H14.857a.676.676,0,0,0,.526-.249.689.689,0,0,0,.138-.578A7.276,7.276,0,0,0,8.6,8.947c-.059,0-.115,0-.175,0s-.114,0-.174,0A7.258,7.258,0,0,0,2.4,12.164a.658.658,0,0,1-1.094-.73A8.58,8.58,0,0,1,5.748,8.063a4.478,4.478,0,1,1,5.36,0,8.557,8.557,0,0,1,2.67,1.445,4.365,4.365,0,0,1,.559-.286,2.378,2.378,0,1,1,3.387-.006c.027.009.05.019.073.029a4.452,4.452,0,0,1,.724.4,2.377,2.377,0,1,1,3.867,2.641,4.422,4.422,0,0,1,2.542,2.695,1.434,1.434,0,0,1-1.363,1.87Zm1.038-6.229a1.314,1.314,0,1,0,1.313-1.313A1.315,1.315,0,0,0,19.373,10.626ZM14.718,7.549a1.314,1.314,0,1,0,1.315-1.313A1.316,1.316,0,0,0,14.718,7.549ZM5.267,4.479a3.164,3.164,0,0,0,3,3.156h.32a3.161,3.161,0,1,0-3.32-3.156Z"
            transform="translate(-0.018 -0.001)"
        />
    </svg>
);

export const Facebook = ({className="social-icon facebook-icon", props}) => (
    <svg
        className = {className}
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
    >
        <defs>
            <linearGradient
                id="facebook-icon"
                x1="0.5"
                x2="0.5"
                y2="1"
                gradientUnits="objectBoundingBox"
            >
                <stop offset="0" stopColor="#03effe" />
                <stop offset="1" stopColor="#4facfe" />
            </linearGradient>
        </defs>

        <path d="M15,0A15,15,0,1,0,30,15,15.017,15.017,0,0,0,15,0Zm3.73,15.528H16.29v8.7H12.674v-8.7H10.955V12.454h1.719V10.465a3.391,3.391,0,0,1,3.649-3.649l2.68.01V9.81H17.058a.736.736,0,0,0-.767.837v1.807h2.755Z" />
    </svg>
);

export const Twitter = ({className="social-icon twitter-icon", props}) => (
    <svg
        className = {className}
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
    >
        <defs>
            <linearGradient
                id="twitter-icon"
                x1="0.5"
                x2="0.5"
                y2="1"
                gradientUnits="objectBoundingBox"
            >
                <stop offset="0" stopColor="#03effe" />
                <stop offset="1" stopColor="#4facfe" />
            </linearGradient>
        </defs>
        <path d="M15,0A15,15,0,1,0,30,15,15.017,15.017,0,0,0,15,0Zm6.692,11.567c.007.149.01.3.01.448A9.821,9.821,0,0,1,6.586,20.287a6.971,6.971,0,0,0,5.112-1.43,3.456,3.456,0,0,1-3.225-2.4,3.466,3.466,0,0,0,1.559-.058,3.453,3.453,0,0,1-2.769-3.385c0-.015,0-.03,0-.044a3.438,3.438,0,0,0,1.563.431A3.458,3.458,0,0,1,7.757,8.794,9.8,9.8,0,0,0,14.873,12.4a3.455,3.455,0,0,1,5.883-3.15,6.891,6.891,0,0,0,2.193-.838,3.468,3.468,0,0,1-1.52,1.91,6.864,6.864,0,0,0,1.983-.543A6.945,6.945,0,0,1,21.692,11.567Z" />
    </svg>
);

export const Youtube = (className ="social-icon youtube-icon", props) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
    >
        <defs>
            <linearGradient
                id="youtube-icon"
                x1="0.5"
                x2="0.5"
                y2="1"
                gradientUnits="objectBoundingBox"
            >
                <stop offset="0" stopColor="#03effe" />
                <stop offset="1" stopColor="#4facfe" />
            </linearGradient>
        </defs>
        <path
            d="M-4708-2298a14.9,14.9,0,0,1-10.606-4.394A14.9,14.9,0,0,1-4723-2313a14.9,14.9,0,0,1,4.394-10.607A14.9,14.9,0,0,1-4708-2328a14.9,14.9,0,0,1,10.606,4.394A14.9,14.9,0,0,1-4693-2313a14.9,14.9,0,0,1-4.394,10.607A14.9,14.9,0,0,1-4708-2298Zm-5.1-20.172a2.279,2.279,0,0,0-2.275,2.277v6.1a2.279,2.279,0,0,0,2.275,2.277h10.675a2.279,2.279,0,0,0,2.276-2.277v-6.1a2.279,2.279,0,0,0-2.275-2.277Zm3.815,7.9V-2316l4.348,2.867-4.346,2.866Z"
            transform="translate(4723 2328)"
        />
    </svg>
);