import React from "react";

import "./HowToUse.scss";

import new_drawer from "../assets/new_drawer.png";
import new_card from "../assets/new_card.png";
import card_component from "../assets/card_component.png";

const HowToUse = () => {
    return (
        <div className="how-to-use">
            <h2>시작하기</h2>
            <p>
                안녕하세요. Purrgil Pin(퍼길 핀) 이용 방법을 읽어주셔서
                감사합니다.
            </p>
            <p>
                Purrgil Pin은 링크를 한 곳에 정리하기 위해 만들어진
                서비스입니다. <br />
                인터넷 브라우저의 즐겨찾기나 메신저에 저장해 놓은 링크들은 내
                컴퓨터나 내 휴대폰이 아닌 곳에서 보기 힘듭니다.
                <br />또 저장한 기억은 있는 데 찾으려고 보면 어디에 있는지
                정확히 기억이 안 납니다.
                <br />
                나중에 읽거나 다시 볼 링크는 항상 Purrgil Pin에 저장하고
                찾으셨으면 좋겠습니다.
                <br />
                Purrgil Pin은 여러 곳에 따로 저장된 링크를 한 곳에서 관리하고
                다른 사람들이 모아 놓은 링크도 구경할 수 있습니다.
            </p>
            <h3>회원 가입</h3>
            <p>
                Purrgil Pin은 회원 가입 후 이용하실 수 있습니다.
                <br />
                회원 가입 페이지에서 이메일을 입력하시고 [인증하기] 버튼을
                누르시면 이메일로 인증 코드가 발송됩니다.
                <br />
                이메일에서 인증 코드를 복사하신 후 입력하시던 회원 가입 페이지에
                인증 코드를 입력하면 인증이 완료됩니다.
                <br />
                회원가입에 필요한 개인 정보는 끝입니다. 더 이상의 정보는
                요구하지 않습니다.
            </p>
            <h3>처음 이용</h3>
            <p>
                회원 가입 후 New Drawer로 새로운 Drawer를 만들 수 있습니다.
                <br />
                Purrgil Pin에서 저장하는 링크의 그룹을 Drawer라고 합니다.
                <br />이 그룹은 링크의 정리를 도와주고 공개, 비공개 여부를
                선택해서 다른 사람과 공유할지, 혼자만 볼지 정할 수 있습니다.
                <br />
                Tag를 추가하면 검색을 더욱 쉽게 해주고 같은 Tag를 추가한
                Drawer를 찾을 수 있습니다.
            </p>
            <img src={new_drawer} alt="Drawer 추가 화면" />
            <h3>링크 추가(카드 추가)</h3>
            <p>
                Drawer를 추가하면 링크를 추가 할 수 있습니다. Purrgil Pin에서
                링크는 하나의 카드로 생성됩니다.
                <br />
                카드에는 링크주소(URL)와 제목, 설명, 저장될 그룹(Drawer)를
                설정할 수 있습니다.
                <br />
                Drawer가 비공개라면 Card도 다른 사람이 볼 수 없습니다.
                <br />
                링크 추가 페이지(https://www.ohmydrawer.com/new-card)에서
                Drawer를 선택하지 않으면 기본 Drawer인 Inbox에 저장됩니다.
            </p>
            <img src={new_card} alt="New Card 화면" />
            <p>
                저장한 링크는 Drawer안에 저장이 되고 같이 저장한 정보가
                나옵니다.
                <br />
                Card를 클릭하면 새로운 창에서 링크가 열리고 Card에 읽음 상태 옆
                스위치 버튼으로 읽음 상태를 저장할 수 있습니다.
                <br />이 버튼으로 읽었던 링크인지 아닌지 구분할 수 있습니다.
            </p>
            <img
                src={card_component}
                alt="Card 컴포넌트 화면"
                className="card-component-img"
            />
        </div>
    );
};

export default HowToUse;
