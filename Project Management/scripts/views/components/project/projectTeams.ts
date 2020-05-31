

export default function projectTeams():any {
    return {
        template: `
    <header class="page-header">
        <h2>Project Teams</h2>
    </header>
    <table cellpadding="10" class="page-table">
        <thead>
            <tr>
                <td>Title</td>
                <td>Date of creation</td>
                <td>Date of last change</td>
            </tr>
        </thead>
        <tbody id="projectTeams">
           
        </tbody>
    </table>
    `,
    listeners:[
               
    ]
    };
}
