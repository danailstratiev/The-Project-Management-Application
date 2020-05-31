

export default function teamMembers():any {
    return {
        template: `
    <header class="page-header">
        <h2>Team Members</h2>
    </header>
    <table cellpadding="10" class="page-table">
        <thead>
            <tr>
                <td>First name</td>
                <td>Last name</td>
                <td>Username</td>
            </tr>
        </thead>
        <tbody id="teamMembers">
            
        </tbody>
    </table>
    `,
    listeners:[
              
    ]
    };
}
