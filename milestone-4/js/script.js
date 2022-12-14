

const { createApp } = Vue;


createApp({
  data() {
    return {

      //? contacts

      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio', avatar: '_2', visible: true, messages: [{ date: '20/03/2020 16:30:00', message: 'Ciao come stai?', status: 'sent' }, { date: '20/03/2020 16:30:55', message: 'Bene grazie! Stasera ci vediamo?', status: 'received' }, { date: '20/03/2020 16:35:00', message: 'Mi piacerebbe ma devo andare a fare la spesa.', status: 'sent' }],
        },
        {
          name: 'Samuele', avatar: '_3', visible: true, messages: [{ date: '28/03/2020 10:10:40', message: 'La Marianna va in campagna', status: 'received' }, { date: '28/03/2020 10:20:10', message: 'Sicuro di non aver sbagliato chat?', status: 'sent' }, { date: '28/03/2020 16:15:22', message: 'Ah scusa!', status: 'received' }],
        },
        {
          name: 'Alessandro B.', avatar: '_4',
          visible: true, messages: [{ date: '10/01/2020 15:30:55', message: 'Lo sai che ha aperto una nuova pizzeria?', status: 'sent' }, { date: '10/01/2020 15:50:00', message: 'Si, ma preferirei andare al cinema', status: 'received' }],
        },
        {
          name: 'Alessandro L.', avatar: '_5', visible: true, messages: [{ date: '10/01/2020 15:30:55', message: 'Ricordati di chiamare la nonna', status: 'sent' }, { date: '10/01/2020 15:50:00', message: 'Va bene, stasera la sento', status: 'received' }],
        },
        {
          name: 'Claudia', avatar: '_6', visible: true, messages: [{ date: '10/01/2020 15:30:55', message: 'Ciao Claudia, hai novit???', status: 'sent' }, { date: '10/01/2020 15:50:00', message: 'Non ancora', status: 'received' }, { date: '10/01/2020 15:51:00', message: 'Nessuna nuova, buona nuova', status: 'sent' }],
        },
        {
          name: 'Federico', avatar: '_7', visible: true, messages: [{ date: '10/01/2020 15:30:55', message: 'Fai gli auguri a Martina che ?? il suo compleanno!', status: 'sent' }, { date: '10/01/2020 15:50:00', message: 'Grazie per avermelo ricordato, le scrivo subito!', status: 'received' }],
        },
        {
          name: 'Davide', avatar: '_8', visible: true, messages: [{ date: '10/01/2020 15:30:55', message: 'Ciao, andiamo a mangiare la pizza stasera?', status: 'received' }, { date: '10/01/2020 15:50:00', message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!', status: 'sent' }, { date: '10/01/2020 15:51:00', message: 'OK!!', status: 'received' }],
        }
      ],
      currentChat: 0,
      inputText: '',
      inputContact: '',
      contactSearch: {
        active: false,
        names: []
      },


    }
  },
  methods: {
    //? restituisce l'ultimo messaggio del contatto
    getLastSentMex(index) {
      const mex = this.contacts[index].messages;
      return mex[mex.length - 1].message;
    },
    //? restituisce l'ora dell'ultimo mex in formato hh:mm
    getLastTimeMex(index) {
      const mex = this.contacts[index].messages;
      let time = mex[mex.length - 1].date;

      let output = luxon.DateTime.fromFormat(time, "D hh:mm:ss", { locale: "it-IT" }).toISO();
      let final = luxon.DateTime.fromISO(output, 'h:mm');
      return final.hour + ":" + final.minute;

      /*  return(final.day+ "/"+final.month+"/"+final.year+ " "+ final.hour+":"+final.minute);  */
    },
    //? restituisce l'ora di un determinato mex in formato hh:mm
    getTime(message) {
      let output = luxon.DateTime.fromFormat(message.date, "D hh:mm:ss", { locale: "it-IT" }).toISO();
      let final = luxon.DateTime.fromISO(output, 'h:mm');
      return final.hour + ":" + final.minute;
    },
    //? restituisce la data attuale in formato stringa
    getNowString(){
      const now = new Date();
      let finalDate = this.adjustTime(now.getMonth()) + '/' + this.adjustTime(now.getUTCDate()) + '/' + now.getFullYear() + ' ' + this.adjustTime(now.getHours() )+ ':' + this.adjustTime(now.getMinutes()) + ':' + this.adjustTime(now.getSeconds());
      console.log(finalDate);
      return finalDate;
    },
    //? aggiusta il tempo inferiore a 10 per renderlo compatibile 
    adjustTime(time) {
      if (time < 10) return '0' + time;
      else return time;
    },
    //? inserimento del mex dell'utente
    sentMex() {
      if(this.inputText !== ''){
        const mex = {
          date: this.getNowString(),
          message: this.inputText,
          status: 'sent'
        }
        this.contacts[this.currentChat].messages.push(mex);
        this.inputText = '';
        this.replyMex();
      }
    },
    //? risposta automatica al mex dopo 1s
    replyMex() {
      setTimeout(() => {
        const mex = {
          date: this.getNowString(),
          message: 'OK :)',
          status: 'received'
        }
        this.contacts[this.currentChat].messages.push(mex);
      }, 1000);
    },
    //? passsa in rassegna tutti i contatti che includono la sottostringa inserita e li inserisce in un array
    searchContact() {
      this.contactSearch.names = [];
      if (this.inputContact != '') {
        this.contactSearch.active = true;
        this.contacts.forEach(contact => {
          if (contact.name.toLowerCase().includes(this.inputContact.toLowerCase()))
            this.contactSearch.names.push(contact.name);
        });
      }
      else this.contactSearch.active = false;
    },
    //? controlla se si tratta di questo contatto 
    isThisContact(index) {
      if (!this.contactSearch.active) return true;
      else if (this.contactSearch.names.includes(this.contacts[index].name)) return true;
      else return false;
    }
  }
}).mount('#app');