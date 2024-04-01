import { LucideProps, UserPlus } from "lucide-react";

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 74 74" {...props}>
      <path
        d="M60.943 37.873 23.371 20.361c-3.3-1.538-6.746 1.922-4.819 4.918l9.362 14.545h14.28a1.168 1.168 0 1 1 0 2.334H27.913L18.551 56.7c-1.924 2.991 1.51 6.459 4.82 4.919l37.572-17.51a3.392 3.392 0 0 0 0-6.236z"
        style={{fill: "#c4a2fc"}}
      />
      <path
        d="M48.322 2H2a1 1 0 0 0 0 2h7.262c-.382.8-.224.8-1.193 6.014C8.045 10.012 8.024 10 8 10H2a1 1 0 0 0 0 2h5.719l-1.058 6H2a1 1 0 0 0 0 2h4.308L5.25 26H2a1 1 0 0 0 0 2h2.9l-.851 4.826A2.632 2.632 0 0 0 6.679 36h36a3.484 3.484 0 0 0 3.338-2.826l4.937-28A2.631 2.631 0 0 0 48.322 2zM27.587 17.723 12.624 4H47.39zm16.461 15.1A1.5 1.5 0 0 1 42.679 34h-36a.638.638 0 0 1-.663-.826L10.952 5.18l8.3 7.615-8.752 7.443a1 1 0 1 0 1.3 1.524l8.946-7.6 6.084 5.58a1 1 0 0 0 1.245.085l8.156-5.652 6.15 7.466a1 1 0 0 0 1.544-1.272l-6.044-7.338L48.884 5.4z"
        style={{fill: "#151a6a"}}
      />
      <path
        d="M33.385 30h-16a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2z"
        style={{fill: "#151a6a"}}
      />
    </svg>
  ),
  UserPlus,
};

export type IconType = keyof typeof Icons;