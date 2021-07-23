import React from 'react';
import moment from 'moment';
import Button from '../Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setIsDialogOpen(false)
  };
  
  if(props.isDialogOpen && !open)
    handleClickOpen()
  else if(!props.isDialogOpen && open)
    handleClose()

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.eventData.length>1?`Tasks details (${props.eventData.length})`:"Task details"}</DialogTitle>
        <DialogContent>
                <p><strong>Title: </strong>{props.eventData.title}</p>
                <p><strong>Status: </strong>{props.eventData.status}</p>
                <p><strong>Assigned to: </strong>{props.eventData.assignedTo}</p>
                <p><strong>Start date: </strong>{moment(props.eventData.start).format('DD/MM/YYYY')}</p>
                <p><strong>End date: </strong>{moment(props.eventData.end).format('DD/MM/YYYY')}</p>
                <p className="w-100 border-bottom"></p>
        </DialogContent>
        <DialogActions>
          <Button text="Close" handler={handleClose}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}