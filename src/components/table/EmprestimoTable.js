import React from 'react';

const EmprestimoTable = props => (

    <table className="responsive-table">
        <thead>
            <tr>
                <th>CPF</th>
                <th>UF</th>
                <th>Data Nasc.</th>
                <th>Valor Solicitado</th>
                <th>Parcelamento</th>
                <th>Custo total</th>
                <th>Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                props.emprestimos.length > 0 ? (
                    props.emprestimos.map(emprestimo => (

                        <tr key={emprestimo.id}>
                            <td>{emprestimo.cpf}</td>
                            <td>{emprestimo.uf}</td>
                            <td>{emprestimo.dtNascimento}</td>
                            <td>{emprestimo.valor}</td>
                            <td>{emprestimo.prazo}x de R${emprestimo.parcela}</td>
                            <td>{emprestimo.valorTotal}</td>
                            <td>{emprestimo.concluido ? "Concluído" : "Pendente"}</td>
                            <td className="center-align">
                                {!emprestimo.concluido &&
                                    <button
                                        className="waves-effect waves-light btn-small"
                                        onClick={() => props.updateEmprestimo(emprestimo.id, emprestimo)}>
                                        Efetivar
                                    </button>
                                }
                                {!emprestimo.concluido &&
                                    <button
                                        className="waves-effect waves-light btn-small red darken-4"
                                        onClick={() => props.deleteEmprestimo(emprestimo.id)}>
                                        Cancelar
                                    </button>
                                }
                                {emprestimo.concluido &&
                                    <button
                                        className="waves-effect waves-light btn-small red darken-4"
                                        onClick={() => props.deleteEmprestimo(emprestimo.id)}>
                                        Excluir
                                    </button>
                                }
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>{props.emprestimos[0]}Sem Registros Encontrados</td>
                        </tr>
                    )
            }
        </tbody>
    </table>
);

export default EmprestimoTable;