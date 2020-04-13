import React, { useState } from 'react';

const AddEmprestimoForm = props => {

    const initialFormState = { cpf: '', uf: '', dtNascimento: '', valor: '', prazo: '' };
    const [emprestimo, setEmprestimo] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setEmprestimo({ ...emprestimo, [name]: value });
    }

    const valorMinimo = event => {
        let { name, value } = event.target;

        if (value < 50000) {
            value = 50000;
            setEmprestimo({ ...emprestimo, [name]: value });
        } else {
            setEmprestimo({ ...emprestimo, [name]: value });
        }

    }

    const submitForm = event => {
        event.preventDefault();

        if (!emprestimo.cpf || !emprestimo.uf || !emprestimo.dtNascimento || !emprestimo.valor || !emprestimo.prazo) return;

        props.addEmprestimo(emprestimo);
        setEmprestimo(initialFormState);
    };

    return (
        <div className="row">
            <form className="col s12"
                onSubmit={submitForm}>
                <div className="row">
                    <div className="input-field col s4">
                        <input type="text"
                            id="cpf"
                            name="cpf"
                            maxLength="11"
                            value={emprestimo.cpf}
                            onChange={handleInputChange}
                            required />
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <div className="input-field col s4">
                        <input type="text"
                            id="uf"
                            maxLength="2"
                            name="uf"
                            value={emprestimo.uf}
                            onChange={handleInputChange}
                            required />
                        <label htmlFor="uf">UF</label>
                    </div>
                    <div className="input-field col s4">
                        <input type="date"
                            id="dtNascimento"
                            name="dtNascimento"
                            value={emprestimo.dtNascimento}
                            onChange={handleInputChange}
                            required />
                        <label htmlFor="dtNascimento">Data de Nascimento</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="number"
                            id="valor"
                            name="valor"
                            min="50000"
                            onBlur={valorMinimo}
                            value={emprestimo.valor}
                            onChange={handleInputChange}
                            required />
                        <label htmlFor="valor">Valor Requerido</label>
                    </div>
                    <div className="input-field col s6">
                        <input type="text"
                            id="prazo"
                            name="prazo"
                            value={emprestimo.prazo}
                            onChange={handleInputChange}
                            required />
                        <label htmlFor="prazo">Prazo de pagamento (Em Meses)</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <button className="waves-effect waves-light btn">Simular</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddEmprestimoForm;
