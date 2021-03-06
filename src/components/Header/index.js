import React, { useState, Fragment } from "react";
import { Row, Col, Drawer } from "antd";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./styles";

const SvgIcon = loadable(() => import("../../common/SvgIcon"));
const Button = loadable(() => import("../../common/Button"));

const Header = ({ t }) => {
  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      console.error("Failed to log out");
    }
  }

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <Fragment>
        {currentUser ? (
          <>
            <S.CustomNavLinkSmall style={{ hover: "180px" }}>
              <strong>{currentUser.email}</strong>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall>
              <S.Span>
                <Link to="/myassets">{t("My Listings")}</Link>
              </S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall>
              <S.Span>
                <Link to="/">{t("All Listings")}</Link>
              </S.Span>
            </S.CustomNavLinkSmall>

            <S.CustomNavLinkSmall onClick={handleLogout}>
              <S.Span>
                <Link to="/">{t("Logout")}</Link>
              </S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall style={{ width: "180px" }}>
              <S.Span>
                <Link to="/addAsset">
                  <Button>{t("Add Listing")}</Button>
                </Link>
              </S.Span>
            </S.CustomNavLinkSmall>
          </>
        ) : (
          <>
            <S.CustomNavLinkSmall onClick={() => scrollTo("about")}>
              <S.Span>{t("About")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
              <S.Span>{t("Mission")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("product")}>
              <S.Span>{t("Contact")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall style={{ width: "180px" }}>
              <S.Span>
                <Link to="/login">
                  <Button>{t("Open Cache")}</Button>
                </Link>
              </S.Span>
            </S.CustomNavLinkSmall>
          </>
        )}
      </Fragment>
    );
  };

  return (
    <S.Header style={{ maxHeight: "120px" }}>
      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" />
          </S.LogoContainer>
          <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.Burger onClick={showDrawer}>
            <S.Outline />
          </S.Burger>
        </Row>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: "2.5rem" }}>
              <S.Label onClick={onClose}>
                <Col span={12}>
                  <S.Menu>Menu</S.Menu>
                </Col>
                <Col span={12}>
                  <S.Outline padding="true" />
                </Col>
              </S.Label>
            </Col>
            <MenuItem />
          </Drawer>
        </CSSTransition>
      </S.Container>
    </S.Header>
  );
};

export default withTranslation()(Header);
