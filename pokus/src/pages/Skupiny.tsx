import { FunctionComponent, useCallback } from "react";
import GroupForm from "../components/GroupForm";
import Button from "../components/Button";
import "./Skupiny.css";

const Skupiny: FunctionComponent = () => {

  return (
    <div className="skupiny">
      <GroupForm />
      <div className="frame">
        <img
          className="pngtreeletter-y-logo-png-6100"
          alt=""
          src="/pngtreeletter-y-logo-png-6100849-1@2x.png"
        />
        <div className="frame1">
          <Button
            createGroupButtonText="Vytvořit skupinu"
            buttonPosition="absolute"
            buttonTop="894px"
            buttonLeft="177px"
            buttonCursor="pointer"
            buttonFontSize="64px"
            onButtonContainerClick={onButtonContainerClick}
          />
          <div className="frame2">
            <div className="frame3" />
            <div className="frame4">
              <div className="inspirace-parent">
                <div className="inspirace" onClick={onInspiraceContainerClick}>
                  <img className="skupiny-icon" alt="" src="/skupiny.svg" />
                  <div className="inspirace-child" />
                  <b className="star-wars">Star wars</b>
                  <div className="inspirace-item" />
                  <b className="pejt-na">Přejít na</b>
                  <div className="inspirace-inner" />
                  <b className="registrovat">Registrovat</b>
                </div>
                <div className="inspirace1">
                  <img className="skupiny-icon" alt="" src="/skupiny.svg" />
                  <div className="inspirace-child" />
                  <b className="star-wars">Bali</b>
                  <div className="inspirace-item" />
                  <b className="pejt-na">Přejít na</b>
                  <div className="inspirace-inner" />
                  <b className="registrovat">Registrovat</b>
                </div>
                <div className="inspirace1">
                  <div className="inspirace-child2" />
                  <img className="skupiny-icon" alt="" src="/skupiny.svg" />
                  <div className="frame5">
                    <b className="dwa">Apple</b>
                  </div>
                  <div className="inspirace-inner" />
                  <div className="frame6">
                    <div className="frame-child" />
                  </div>
                  <div className="frame7">
                    <b className="registrovno" onClick={onRegistrovnoTextClick}>
                      Registrováno
                    </b>
                  </div>
                  <div className="frame8">
                    <b className="registrovno" onClick={onZobrazitTextClick}>
                      Zobrazit
                    </b>
                  </div>
                </div>
                <div className="inspirace1">
                  <img className="skupiny-icon" alt="" src="/skupiny.svg" />
                  <div className="inspirace-child" />
                  <div className="frame9">
                    <b className="dwa">Lamborghini</b>
                  </div>
                  <div className="inspirace-item" />
                  <div className="frame10">
                    <b className="dwa">Přejít na</b>
                  </div>
                  <div className="inspirace-inner" />
                  <div className="frame11">
                    <b className="dwa">Registrovat</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-item" />
        <div className="frame-inner" />
      </div>
    </div>
  );
};

export default Skupiny;
