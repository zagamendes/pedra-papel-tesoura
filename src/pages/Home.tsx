import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonText,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { refreshCircle, star } from "ionicons/icons";
import { useRef, useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [win, setGanhou] = useState(0);
  const [lost, setPerdeu] = useState(0);
  const perdeu = useRef<HTMLAudioElement>(null);
  const ganhou = useRef<HTMLAudioElement>(null);
  const chooseWinner = (e: any) => {
    const { valor } = e.target.dataset;
    const valores = ["pedra", "papel", "tesoura"];
    const valorDaMaquina = valores[Math.floor(Math.random() * 3)];
    if (valor == valorDaMaquina) {
      setMessage("empate!");
      setShowButtons(false);
    } else if (valor == "pedra" && valorDaMaquina == "papel") {
      setMessage("você perdeu!");
      setShowButtons(false);
      perdeu.current?.play();
      setPerdeu(lost + 1);
    } else if (valor == "pedra" && valorDaMaquina == "tesoura") {
      setMessage("você ganhou!");
      setShowButtons(false);
      ganhou.current?.play();
      setGanhou(win + 1);
    } else if (valor == "papel" && valorDaMaquina == "pedra") {
      setMessage("você ganhou!");
      setShowButtons(false);
      ganhou.current?.play();
      setGanhou(win + 1);
    } else if (valor == "papel" && valorDaMaquina == "tesoura") {
      setMessage("você perdeu!");
      setShowButtons(false);
      perdeu.current?.play();
      setPerdeu(lost + 1);
    } else if (valor == "tesoura" && valorDaMaquina == "papel") {
      setMessage("você ganhou!");
      setShowButtons(false);
      ganhou.current?.play();
      setGanhou(win + 1);
    } else {
      setMessage("você perdeu!");
      setShowButtons(false);
      perdeu.current?.play();
      setPerdeu(lost + 1);
    }
  };
  const restart = () => {
    setMessage("");
    setShowButtons(true);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Pedra Papel Tesoura</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCard className=" w-100">
              <IonCardHeader>
                <IonCardTitle className="text-center">
                  <strong>Resultado</strong>
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent className="d-flex justify-content-center flex-column align-items-center ">
                {/* <IonButton size="large" color="danger">
                  👊🏻
                </IonButton> */}
                <strong className="ion-text-capitalize">{message}</strong>
                {message.length > 0 && message.includes("ganhou") ? (
                  <iframe
                    src="https://giphy.com/embed/l4JySAWfMaY7w88sU"
                    frameBorder="0"
                    className="giphy-embed my-2"
                    allowFullScreen
                  ></iframe>
                ) : (
                  message.length > 0 && (
                    <div style={{ width: "100%" }}>
                      <iframe
                        src="https://giphy.com/embed/TydZAW0DVCbGE"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        className="giphy-embed"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )
                )}
              </IonCardContent>
            </IonCard>
          </IonRow>
          <audio ref={perdeu}>
            <source src="/assets/audios/you loose.mp3"></source>
          </audio>
          <audio ref={ganhou}>
            <source src="/assets/audios/you win.mp3"></source>
          </audio>
          <IonRow>
            <IonCol size="4">
              <IonButton
                expand="block"
                data-valor="pedra"
                onClick={chooseWinner}
                disabled={!showButtons}
                fill="outline"
                size="large"
              >
                👊🏻
              </IonButton>
            </IonCol>

            <IonCol size="4">
              <IonButton
                expand="block"
                data-valor="papel"
                onClick={chooseWinner}
                disabled={!showButtons}
                fill="outline"
                size="large"
              >
                🖐🏻
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton
                expand="block"
                data-valor="tesoura"
                onClick={chooseWinner}
                disabled={!showButtons}
                fill="outline"
                size="large"
              >
                ✌🏻
              </IonButton>
            </IonCol>
          </IonRow>
          {message.length == 0 ? (
            ""
          ) : (
            <IonRow className="ion-margin-top">
              <IonCol>
                <IonButton expand="block" size="large" onClick={restart}>
                  <IonIcon icon={refreshCircle}></IonIcon> Jogar Novamente
                </IonButton>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonBadge slot="end">
                    {win} {win > 1 || win == 0 ? "vezes" : "vez"}
                  </IonBadge>
                  <IonLabel>Você ganhou </IonLabel>
                </IonItem>
                <IonItem>
                  <IonBadge slot="end" color="danger">
                    {lost} {lost > 1 || lost == 0 ? "vezes" : "vez"}
                  </IonBadge>
                  <IonLabel>Você perdeu </IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
