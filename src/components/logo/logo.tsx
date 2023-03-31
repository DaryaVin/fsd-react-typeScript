import React from 'react';

export const Logo = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
    {...props}
      width="106"
      height="40"
      viewBox="0 0 106 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M62.335 13.368C62.5567 13.368 62.7375 13.4438 62.8775 13.5955C63.0292 13.7355 63.105 13.9163 63.105 14.138C63.105 14.348 63.0292 14.5288 62.8775 14.6805C62.7375 14.8322 62.5567 14.908 62.335 14.908H58.5725V25.408C58.5725 25.6297 58.4967 25.8163 58.345 25.968C58.205 26.108 58.0242 26.178 57.8025 26.178C57.5925 26.178 57.4117 26.108 57.26 25.968C57.1083 25.8163 57.0325 25.6297 57.0325 25.408V14.908H53.27C53.06 14.908 52.8792 14.8322 52.7275 14.6805C52.5758 14.5288 52.5 14.348 52.5 14.138C52.5 13.9163 52.5758 13.7355 52.7275 13.5955C52.8792 13.4438 53.06 13.368 53.27 13.368H62.335Z" fill="#1F2041" />
      <path d="M68.9076 13.368C69.7943 13.368 70.6285 13.5372 71.4101 13.8755C72.2035 14.2138 72.8918 14.6747 73.4751 15.258C74.0701 15.8413 74.5368 16.5297 74.8751 17.323C75.2134 18.1047 75.3826 18.9388 75.3826 19.8255C75.3826 20.8638 75.1609 21.8205 74.7176 22.6955C74.2743 23.5705 73.6735 24.3055 72.9151 24.9005C72.9151 24.9005 72.9035 24.9122 72.8801 24.9355C72.3201 25.3555 71.7076 25.688 71.0426 25.933C70.3776 26.1663 69.666 26.283 68.9076 26.283C68.0209 26.283 67.1868 26.1138 66.4051 25.7755C65.6234 25.4372 64.9351 24.9763 64.3401 24.393C63.7568 23.8097 63.296 23.1272 62.9576 22.3455C62.6193 21.5638 62.4501 20.7238 62.4501 19.8255C62.4501 18.8455 62.6484 17.9413 63.0451 17.113C63.4418 16.273 63.9843 15.5555 64.6726 14.9605L64.7426 14.8905C64.7543 14.8905 64.7718 14.8788 64.7951 14.8555C65.3551 14.3888 65.9851 14.0272 66.6851 13.7705C67.3851 13.5022 68.1259 13.368 68.9076 13.368ZM68.9076 24.743C69.351 24.743 69.771 24.6905 70.1676 24.5855C70.576 24.4688 70.961 24.3113 71.3226 24.113L65.1801 16.6405C64.8068 17.0722 64.5151 17.5622 64.3051 18.1105C64.0951 18.6472 63.9901 19.2188 63.9901 19.8255C63.9901 20.5022 64.1185 21.138 64.3751 21.733C64.6318 22.328 64.9818 22.853 65.4251 23.308C65.8801 23.7513 66.4051 24.1013 67.0001 24.358C67.5951 24.6147 68.231 24.743 68.9076 24.743ZM72.5301 23.1505C72.9384 22.7072 73.2535 22.2055 73.4751 21.6455C73.7085 21.0738 73.8251 20.4672 73.8251 19.8255C73.8251 19.1488 73.6968 18.513 73.4401 17.918C73.1834 17.323 72.8276 16.8038 72.3726 16.3605C71.9293 15.9055 71.4101 15.5497 70.8151 15.293C70.2201 15.0363 69.5843 14.908 68.9076 14.908C68.4409 14.908 67.9918 14.9722 67.5601 15.1005C67.1284 15.2172 66.7259 15.3922 66.3526 15.6255L72.5301 23.1505Z" fill="#1F2041" />
      <path d="M82.351 20.6305C82.1177 20.6305 81.9194 20.5372 81.756 20.3505L77.2585 14.5755C77.1302 14.4122 77.0777 14.2313 77.101 14.033C77.1244 13.823 77.2177 13.6538 77.381 13.5255C77.5444 13.3972 77.7252 13.3505 77.9235 13.3855C78.1335 13.4088 78.3027 13.5022 78.431 13.6655L82.351 18.6705L86.1835 13.753C86.3119 13.5897 86.4752 13.4963 86.6735 13.473C86.8835 13.4497 87.0702 13.5022 87.2335 13.6305C87.3969 13.7588 87.4902 13.928 87.5135 14.138C87.5369 14.3363 87.4844 14.5172 87.356 14.6805L82.946 20.3505C82.7944 20.5372 82.596 20.6305 82.351 20.6305ZM87.2685 26.2655C87.2219 26.2655 87.146 26.2597 87.041 26.248C86.9477 26.2363 86.8369 26.2072 86.7085 26.1605C86.5802 26.1022 86.4402 26.0263 86.2885 25.933C86.1485 25.828 86.0085 25.688 85.8685 25.513L82.351 20.9805L78.5185 25.9155C78.3902 26.0788 78.221 26.1722 78.011 26.1955C77.8127 26.2188 77.6319 26.1663 77.4685 26.038C77.3052 25.9097 77.2119 25.7463 77.1885 25.548C77.1652 25.338 77.2177 25.1513 77.346 24.988L81.756 19.318C81.896 19.1313 82.0885 19.038 82.3335 19.038C82.5902 19.038 82.7944 19.1313 82.946 19.318L87.041 24.568C87.0994 24.6497 87.1519 24.7022 87.1985 24.7255C87.2452 24.7488 87.2802 24.7663 87.3035 24.778C87.5019 24.778 87.6652 24.848 87.7935 24.988C87.9335 25.1163 88.0094 25.2797 88.021 25.478C88.0444 25.688 87.986 25.8688 87.846 26.0205C87.706 26.1722 87.531 26.2538 87.321 26.2655H87.2685Z" fill="#1F2041" />
      <path d="M91.7343 26.2655C91.5126 26.2655 91.326 26.1897 91.1743 26.038C91.0226 25.8863 90.9468 25.6997 90.9468 25.478V14.103C90.9468 13.893 91.0226 13.7122 91.1743 13.5605C91.326 13.4088 91.5126 13.333 91.7343 13.333C91.9443 13.333 92.1251 13.4088 92.2768 13.5605C92.4285 13.7122 92.5043 13.893 92.5043 14.103V25.478C92.5043 25.6997 92.4285 25.8863 92.2768 26.038C92.1251 26.1897 91.9443 26.2655 91.7343 26.2655Z" fill="#1F2041" />
      <path d="M104.938 26.2305C104.681 26.2305 104.483 26.1313 104.343 25.933L97.0452 16.343V25.478C97.0452 25.688 96.9693 25.8688 96.8177 26.0205C96.6777 26.1605 96.5027 26.2305 96.2927 26.2305C96.0943 26.2305 95.9193 26.1605 95.7677 26.0205C95.616 25.8688 95.5402 25.688 95.5402 25.478V14.1205C95.5402 13.9572 95.5868 13.8113 95.6802 13.683C95.7735 13.5547 95.9018 13.4672 96.0652 13.4205C96.2168 13.3622 96.3685 13.3563 96.5202 13.403C96.6718 13.4497 96.8002 13.5372 96.9052 13.6655L104.185 23.273V14.1205C104.185 13.9222 104.255 13.7472 104.395 13.5955C104.547 13.4438 104.728 13.368 104.938 13.368C105.148 13.368 105.323 13.4438 105.463 13.5955C105.614 13.7472 105.69 13.9222 105.69 14.1205V25.478C105.69 25.6413 105.643 25.7872 105.55 25.9155C105.457 26.0438 105.334 26.1372 105.183 26.1955C105.066 26.2188 104.984 26.2305 104.938 26.2305Z" fill="#1F2041" />
      <path d="M20.0003 27.0587C19.3533 27.0587 18.8239 26.5292 18.8239 25.8822C18.8239 21.3528 15.118 17.6469 10.5886 17.6469C9.94152 17.6469 9.41211 17.1175 9.41211 16.4704C9.41211 15.8234 9.94152 15.2939 10.5886 15.2939C16.4415 15.2939 21.1768 20.0292 21.1768 25.8822C21.1768 26.5292 20.6474 27.0587 20.0003 27.0587Z" fill="url(#paint0_linear_1_1087)" />
      <path d="M30.5884 16.4704C30.5884 17.1175 30.0589 17.6469 29.4119 17.6469C26.6178 17.6469 24.1178 19.0587 22.6472 21.2057C22.3236 20.3822 21.9413 19.6175 21.4707 18.9116C23.4119 16.6763 26.2648 15.2939 29.4119 15.2939C30.0589 15.2939 30.5884 15.8234 30.5884 16.4704Z" fill="url(#paint1_linear_1_1087)" />
      <path d="M20 40C8.97059 40 0 31.0294 0 20C0 8.97059 8.97059 0 20 0C31.0294 0 40 8.97059 40 20C40 31.0294 31.0294 40 20 40ZM20 2.35294C10.2647 2.35294 2.35294 10.2647 2.35294 20C2.35294 29.7353 10.2647 37.6471 20 37.6471C29.7353 37.6471 37.6471 29.7353 37.6471 20C37.6471 10.2647 29.7353 2.35294 20 2.35294Z" fill="url(#paint2_linear_1_1087)" />
      <defs>
        <linearGradient id="paint0_linear_1_1087" x1="15.2945" y1="15.2939" x2="15.2945" y2="27.0587" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BC9CFF" />
          <stop offset="1" stopColor="#8BA4F9" />
        </linearGradient>
        <linearGradient id="paint1_linear_1_1087" x1="26.0295" y1="15.2939" x2="26.0295" y2="21.2057" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6FCF97" />
          <stop offset="1" stopColor="#66D2EA" />
        </linearGradient>
        <linearGradient id="paint2_linear_1_1087" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BC9CFF" />
          <stop offset="1" stopColor="#8BA4F9" />
        </linearGradient>
      </defs>
    </svg>

  )
}
