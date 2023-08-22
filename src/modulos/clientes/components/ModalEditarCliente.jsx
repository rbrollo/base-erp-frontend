import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import BaseAPI from "../../../api/BaseAPI";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalEditarCliente(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cliente, setCliente] = useState([{}]);

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
    BaseAPI.patch("/clientes/cliente/" + props.idCliente + "/", cliente)
      .then((response) => {
        props.getClientes();
        handleClose();
        toast.success("Cliente editado!", customToastOptions);
      })
      .catch((err) => {
        toast.error("Erro ao editar cliente!", customToastOptions);
      });
  };

  function getCliente() {
    handleShow();
    BaseAPI.get("/clientes/cliente/" + props.idCliente)
      .then((response) => {
        const { data } = response;
        setCliente(data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <Button
        variant="warning"
        onClick={() => getCliente()}
        title="Abrir cadastro do cliente"
        className="p-1"
      >
        <EditIcon />
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadastro do cliente </Modal.Title>
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
                maxLength={100}
                required
                value={cliente.nome}
                onChange={(e) =>
                  setCliente({ ...cliente, nome: e.target.value })
                }
              />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Data de nascimento*"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    required
                    min="1500-01-01"
                    max="9998-12-31"
                    value={cliente.data_nascimento}
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        data_nascimento: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Telefone*"
                  className="mb-3"
                  required
                >
                  <Form.Control
                    type="text"
                    maxLength={20}
                    value={cliente.telefone}
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        telefone: e.target.value,
                      })
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

export { ModalEditarCliente };
export default ModalEditarCliente;
