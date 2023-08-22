import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import BaseAPI from "../../../api/BaseAPI";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalEditarServico(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [servico, setServico] = useState([{}]);

  const {
    handleSubmit,
  } = useForm();

  const customToastOptions = {
    position: "bottom-right", // Posição onde as notificações serão exibidas
    autoClose: 3000, // Tempo em milissegundos para as notificações fecharem automaticamente
    hideProgressBar: false, // Mostrar barra de progresso de tempo
    pauseOnHover: true, // Pausar o tempo de fechamento ao passar o mouse sobre a notificação
    draggable: true, // Permitir arrastar as notificações
    progress: undefined, // Componente customizado para barra de progresso, caso queira substituir
  };

  const editar = () => {
    console.log(servico);
    BaseAPI.patch("/servicos/servico/" + props.idServico + "/", servico)
      .then((response) => {
        console.log("atualizado", response);
        props.getServicos();
        handleClose();
        toast.success("Serviço editado!", customToastOptions);
      })
      .catch((err) => {
        toast.error("Erro ao editar serviço!", customToastOptions);
      });
  };

  function getServico() {
    handleShow();
    BaseAPI.get("/servicos/servico/" + props.idServico)
      .then((response) => {
        const { data } = response;
        setServico(data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Button
        variant="warning"
        onClick={() => getServico()}
        title="Abrir cadastro do serviço"
        className="p-1"
      >
        <EditIcon />
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastro do serviço </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(editar)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome*"
              className="mb-3"
            >
              <Form.Control
                type="text"
                maxLength={50}
                required
                value={servico.nome_servico}
                onChange={(e) =>
                  setServico({ ...servico, nome_servico: e.target.value })
                }
              />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Descrição"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    maxLength={100}
                    required
                    value={servico.descricao_servico}
                    onChange={(e) =>
                      setServico({
                        ...servico,
                        descricao_servico: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Valor*"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    step="0.01"
                    required
                    value={servico.valor_servico}
                    onChange={(e) =>
                      setServico({ ...servico, valor_servico: e.target.value })
                    }
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                Editar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export { ModalEditarServico };
export default ModalEditarServico;
