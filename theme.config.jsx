import Logo from "./Components/Logo";

export default {
  logo: (
    <>
      <Logo />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://ioloco.com" target="_blank">
          Ioloco
        </a>
        .
      </span>
    ),
  },
};
