import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ConfirmDialog = (title: string, DowhenYes: (() => void)) => {
    confirmAlert({
        title: title,
        message: 'Are you sure to do this?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => { DowhenYes() }
            },
            {
                label: 'No',
                onClick: () => false
            },
        ]
    });
}
export default ConfirmDialog;