import { useState } from "react";


const Smsbar =  (props)  => {
    const [col, setcol] = useState('');
    const [Absentees, setAbsentees] = useState({});

    const getData = async () => {
        const sheetId = props.sheetId;
        const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        const sheetName = props.sheetName;
        const query = encodeURIComponent(`select B,C where ${col}=TRUE`);
        const url = `${base}&sheet=${sheetName}&tq=${query}&key=${sheetId}`;

      await  fetch(url)
        .then((response) => response.text())
        .then((rep) => {
            const jso = JSON.parse(rep.substring(47).slice(0, -2));

            jso.table.rows.forEach((row) => {
                const nameCell = row.c[1];
                const mobileCell = row.c[0];
                
                if (nameCell && mobileCell) {
                    Absentees[nameCell.v] = mobileCell.v;
                }
            });
            console.log(Absentees);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    const handleSendSms = async () => {
       await getData();
        try {
          const response = await fetch('https://smsserver-fgs5.onrender.com/sendsms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contacts: Absentees }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            window.alert('Messages sent successfully:', data);
          } else {
            console.error('Failed to send messages:', data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const SendSms = async (e) => {
        e.preventDefault();
        
        handleSendSms()
        setcol("");
        setAbsentees({});
    };


    return (
        <div className="smsbar" style={{ backgroundColor: "black", height: '3vw' }}>
            <div style={{ color: "white", height: "fit-content", alignSelf: "center", padding: "0.8vw" }}>
                <div style={{ color: "white", float: "left" }}>
                    Send SMS
                </div>
                <div style={{ float: "right" }}>
                    <form onSubmit={SendSms}>
                        <input
                            type="text"
                            name="smsinput"
                            onChange={(e) => { setcol(e.target.value.toUpperCase()); }}
                            value={col}
                            placeholder="Enter the column name"
                        />
                        <button type="submit" style={{ backgroundColor: "white", color: "black" }}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Smsbar;
