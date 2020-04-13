import React, { Component } from 'react';
import qs from 'querystring';

import api from '../services/api';

import EmprestimoTable from '../components/table/EmprestimoTable';
import AddEmprestimoForm from '../components/forms/AddEmprestimoForm';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emprestimos: [],
            currentEmprestimo: { id: null, cpf: '', uf: '', dtNascimento: '', valor: '', prazo: '', valorTotal: '', parcela: '', concluido: '' },
            editing: false
        }
    }

    componentDidMount() {
        this.refreshEmprestimoTable();
    }

    refreshEmprestimoTable() {
        this.emprestimosData = api.get('api')
            .then(response => response.data)
            .then(data => {
                console.log(data.data);
                data.data.map(function (emprestimo) {
                    var dtNascimento = new Date(emprestimo.dtNascimento)
                    var dia = dtNascimento.getDate().toString(),
                        diaF = (dia.length == 1) ? '0' + dia : dia,
                        mes = (dtNascimento.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                        mesF = (mes.length == 1) ? '0' + mes : mes,
                        anoF = dtNascimento.getFullYear();
                    emprestimo.dtNascimento = diaF + "/" + mesF + "/" + anoF;
                });

                this.setState({
                    emprestimos: data.data,
                    setEmprestimos: data.data
                });
            });
    }

    addEmprestimo = emprestimo => {

        api.post('api', qs.stringify(emprestimo))
            .then(res => {
                this.refreshEmprestimoTable();
            });
    };

    deleteEmprestimo = id => {

        api.delete(`api/${id}`)
            .then(res => {
                this.refreshEmprestimoTable();
            });
    };

    updateEmprestimo = (id, emprestimo) => {

        api.put(`api/${id}`, qs.stringify(emprestimo))
            .then(res => {
                alert(res.data.message);
                this.refreshEmprestimoTable();
            });

        this.setState({
            currentEmprestimo: { id: null, concluido: true }
        });

        this.setEditing(false);
    };

    setEditing = isEditing => {

        this.setState({ editing: isEditing });
    };

    render() {
        const { emprestimos } = this.state;

        return (
            <div className="container">

                <div className="row">
                    <div className="row">
                        <div className="col s12">
                            <h4>Simular Empréstimo</h4>
                            <AddEmprestimoForm addEmprestimo={this.addEmprestimo} />
                        </div>
                    </div>

                    <div className="col s12">
                        <h5>Empréstimos</h5>
                        <EmprestimoTable emprestimos={emprestimos} updateEmprestimo={this.updateEmprestimo} deleteEmprestimo={this.deleteEmprestimo} />
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;