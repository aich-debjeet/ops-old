import { Component, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';

import _ from "lodash";
import { Message } from "../../models/message.model";
import { UserMessages } from '../../models/user-messages.model';

// actions
import { MessageActions } from '../../actions/message.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  sentMessages$: Observable<UserMessages>;
  receivedMessages$: Observable<UserMessages>;
  sentMessages;
  receivedMessages;

  selectedView: string = '';
  userHandle: string = '';

  constructor(private store: Store<Message>) {

    // this.sentMessages = this.getAllSentMessages().messages.sent;
    // this.receivedMessages = this.getAllReceivedMessages().messages.received;
    // console.log(this.sentMessages);
    // console.log(this.receivedMessages);

    // group messages
    //this.groupMessages();

    this.sentMessages$ = this.store.select('sentMessagesTags');
    this.receivedMessages$ = this.store.select('receivedMessagesTags');

    this.sentMessages$.subscribe((state) => {
      this.sentMessages = state;
    });

    this.receivedMessages$.subscribe((state) => {
      this.receivedMessages = state;
    });

    // dispatch load messages
    this.store.dispatch({ type: MessageActions.LOAD_SENT_MESSAGES });
    this.store.dispatch({ type: MessageActions.LOAD_RECEIVED_MESSAGES });

  }

  groupMessages() {

    // prepare messages to display
    //console.log('start grouping messages: '+this.messages);

    let groupedMessages = [];

    let totalLength = this.sentMessages.length;
    console.log('totalLength: '+totalLength);

    // grouping the messages by userHandle
    this.sentMessages.forEach(function(message, index) {

      //groupedMessages[message.to] = message;

      // checking if user already exist in group array, if yes then append new message
      if(groupedMessages.hasOwnProperty(message.to)) {

        //console.log('found');
        // appending the new message to existing users array
        groupedMessages[message.to].push(message);

      } else { // else add user and message to the new array

        //console.log('not found');
        // making a placeholder array for next users messages
        groupedMessages[message.to] = [];
        groupedMessages[message.to].push(message);

      }

      if(totalLength == index+1) {
        console.log('finished: '+index);
        console.log(groupedMessages);
      }

    });

  }

  // user action to toogle views
  toggleView(tab: any, userHandle: any) {

    // toggle view
    this.selectedView = tab;

    // trigger actions
    if(this.selectedView == 'readMessage') {

      this.userHandle = userHandle;

      // load user message
      console.log(userHandle);

    }

  }

  // dummy response
  getAllSentMessages() {

    return JSON.parse('{"messages":{"sent":[{"id":"h_ac88b5f6-3990-4311-92ed-689b67890e3c","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"Z_4A3E954C_7F22_444B_9095_BAF0FE0B8A72YASWANTH_RAJA_AEIONE_COM","subject":"Hii...yaswanth","content":"Hii...yaswanth","time":"2017-06-28T11:44:22.976","isRead":false},{"id":"l-be61ca00-8176-4918-b656-70d4d722bd67","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"L_E65E2BA1_9CFA_4E79_B5A1_950524FFFA96DINESHWEBB_GMAIL_COM","subject":"Hiii....","content":"Hiii....","time":"2017-06-28T11:46:35.41","isRead":false},{"id":"p_58ec7c32-f7d3-4d3b-85b7-559e66b215ca","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"L_E65E2BA1_9CFA_4E79_B5A1_950524FFFA96DINESHWEBB_GMAIL_COM","subject":"Hi dinesh ....","content":"Hi dinesh ....","time":"2017-07-04T10:30:56.885","isRead":false},{"id":"l_a1d38b2d-52bc-49a4-82eb-31f20a58c537","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"Z_4A3E954C_7F22_444B_9095_BAF0FE0B8A72YASWANTH_RAJA_AEIONE_COM","subject":"Hi...plz take care about our bugs na","content":"Hi...plz take care about our bugs na","time":"2017-07-04T10:33:46.998","isRead":false},{"id":"n-82c25c5a-09aa-4ae0-a683-d727aeb74f8b","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_AD57E36C_EA89_4EFA_9E65_70B239565F2FANUSHKA19_SHETTY81_GMAIL_COM","subject":"hiii","content":"hiii","time":"2017-07-04T10:42:05.789","isRead":false},{"id":"a_c1983fa0-21fb-4780-a218-7affe14d1944","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"Hiii prapthi","content":"Hiii prapthi","time":"2017-07-04T10:52:01.86","isRead":false},{"id":"q_9b41651b-2a82-490d-abe2-a376a27c5e64","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"X_7F29BBC4_98D6_4A8D_81EC_D036EB3727FBHRUDAY_KUPPALI_THEJADESHOW_COM","subject":"hiii","content":"hiii","time":"2017-07-04T10:52:23.729","isRead":false},{"id":"t_5e1828ea-68ea-4aeb-b8c1-f4eeab792d5d","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"hii","content":"hii","time":"2017-07-04T10:53:46.474","isRead":false},{"id":"a-0d0efe63-14f3-4875-85d9-5694b33d959d","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"X_7F29BBC4_98D6_4A8D_81EC_D036EB3727FBHRUDAY_KUPPALI_THEJADESHOW_COM","subject":"hiii","content":"hiii","time":"2017-07-04T10:54:15.259","isRead":false},{"id":"g_7a369d09-ac61-48a6-b855-9288b5f82d22","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"cfgf","content":"cfgf","time":"2017-07-04T10:55:30.779","isRead":false},{"id":"f-1e638dde-851d-459b-9b0e-55778b3c320b","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"Y_883E03D5_5A3A_4E9B_8DB7_73711B8FDEF7YASWANTH_RAJA_AEIONEASD_COM","subject":"hghg","content":"hghg","time":"2017-07-04T10:57:10.36","isRead":false},{"id":"c-c42fd668-df10-4e19-a616-87d99c07d1d7","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"H_78DFCDBA_1F29_419B_8116_331D6B2781B5MANOJ_S_RAMASWAMY9_AEIONE_COM","subject":"hi","content":"hi","time":"2017-07-04T10:59:36.191","isRead":false},{"id":"a-51469224-ceae-42d5-80cc-50f4a3d5b3df","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"N_7E8BA1F6_EDD3_41B9_8863_E050643CC797PRAPTHIASAGODU86_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T10:59:51.463","isRead":false},{"id":"e_ef778049-e15c-496c-a69b-9a1d47eb45b0","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"N_7E8BA1F6_EDD3_41B9_8863_E050643CC797PRAPTHIASAGODU86_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T10:59:55.004","isRead":false},{"id":"a-28693f0c-8e55-4e52-824f-5eb1826c733e","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"N_7E8BA1F6_EDD3_41B9_8863_E050643CC797PRAPTHIASAGODU86_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T10:59:59.744","isRead":false},{"id":"m-1c5899a2-0e8b-43f0-846a-a90a536ae2ec","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"L_850CC80D_E051_42D9_B31F_28C46BFF3B28SFBAFKB_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T11:00:18.967","isRead":false},{"id":"d-f61be94b-a09d-4dca-9899-c9ee1537c857","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:13.664","isRead":false},{"id":"e_a71cb6df-15c9-4373-87ad-c59f25017d03","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:15.893","isRead":false},{"id":"v_e7e08e09-3b31-452b-8409-6d94f986fec6","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:25.415","isRead":false},{"id":"k-e96db78e-3851-43cb-88f5-1cb577141568","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"X_7F29BBC4_98D6_4A8D_81EC_D036EB3727FBHRUDAY_KUPPALI_THEJADESHOW_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:43.396","isRead":false},{"id":"u-35b37942-a612-44a6-abe1-7de676a2959b","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"X_7F29BBC4_98D6_4A8D_81EC_D036EB3727FBHRUDAY_KUPPALI_THEJADESHOW_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:43.417","isRead":false},{"id":"g-8cd3613c-171d-441a-9610-8a5e367cb313","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"X_7F29BBC4_98D6_4A8D_81EC_D036EB3727FBHRUDAY_KUPPALI_THEJADESHOW_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:48.935","isRead":false},{"id":"j_517f3299-f231-4fcc-912d-0721deb6b88f","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"X_7F29BBC4_98D6_4A8D_81EC_D036EB3727FBHRUDAY_KUPPALI_THEJADESHOW_COM","subject":"hi","content":"hi","time":"2017-07-04T11:38:48.967","isRead":false},{"id":"y_dacad0f6-23a8-4197-a378-1eb610755a06","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"hi","content":"hi","time":"2017-07-04T11:41:34.713","isRead":false},{"id":"o-bb780743-ddcf-4937-84d4-fa4671c0af18","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"hi","content":"hi","time":"2017-07-04T11:41:40.456","isRead":false},{"id":"q-bc2fbd7d-93a1-4043-9853-f64c464ef149","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"hello","content":"hello","time":"2017-07-04T11:41:54.282","isRead":false},{"id":"k-8961e2cd-023a-42fa-9578-d95fc729d0f4","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"hello","content":"hello","time":"2017-07-04T11:41:58.745","isRead":false},{"id":"b_eab88dff-b01f-4c2b-926a-83de03fd7e10","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_B8E6FF5E_3FEC_4768_867A_7F547F2307D4PRAPTHI_CHANDRAPPA_AEIONE_COM","subject":"hello","content":"hello","time":"2017-07-04T11:42:00.939","isRead":false},{"id":"n-b19269ba-2e3d-4716-9b3f-1d8866bffe27","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"A_AD57E36C_EA89_4EFA_9E65_70B239565F2FANUSHKA19_SHETTY81_GMAIL_COM","subject":"Hi anushka","content":"Hi anushka","time":"2017-07-04T13:41:55.808","isRead":false},{"id":"c-7a6f4001-fff8-4c2c-bc52-625563f24407","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"Hi...how ru?","content":"Hi...how ru?","time":"2017-07-06T05:22:38.362","isRead":false},{"id":"s_f32dd23f-8187-47ca-9813-463277995b57","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"nice pic","content":"nice pic","time":"2017-07-06T05:22:51.621","isRead":false},{"id":"o_46240670-bcd3-407d-aa54-e4ca9f0f8071","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"nice pic","content":"nice pic","time":"2017-07-06T05:22:54.494","isRead":false},{"id":"f_e8ba2c88-f38e-4855-8bf7-d67584090368","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"nice pic","content":"nice pic","time":"2017-07-06T05:22:55.719","isRead":false},{"id":"e-2d63bdf9-e732-4b97-bf05-bf1dbe13cdc8","by":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","to":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","subject":"nice pic","content":"nice pic","time":"2017-07-06T05:22:55.735","isRead":false}]}}');

  }

  getAllReceivedMessages() {

    return JSON.parse('{"messages":{"received":[{"id":"u_a472c41e-e991-4590-ad7e-bdb38255b065","by":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","to":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","subject":"hello","content":"hello","time":"2017-07-05T09:12:49.11","isRead":false},{"id":"t_f834c539-3f2c-4df1-975e-04171cee68a9","by":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","to":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","subject":"Hiii","content":"Hiii","time":"2017-07-05T09:13:04.504","isRead":false},{"id":"k-6044bcfe-3c9b-415a-8317-13dbec7edba9","by":"W_D03D8B98_7852_418D_96D0_30C025BCB73DTAPASIPRAPTHI_GMAIL_COM","to":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","subject":"prapthi","content":"prapthi","time":"2017-07-05T09:14:52.673","isRead":false},{"id":"n-04f7ca27-69f6-46c0-8a05-2e2f56e5e740","by":"Z_4A3E954C_7F22_444B_9095_BAF0FE0B8A72YASWANTH_RAJA_AEIONE_COM","to":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","subject":"yaa pakka","content":"yaa pakka","time":"2017-07-24T13:20:00.211","isRead":false},{"id":"y-ad8f8da6-f374-48fe-8586-6165b53fdbac","by":"Z_2CDDA688_13D9_4C4D_A865_6DE9F66374E5PRAPTHI_AEIONE_GMAIL_COM","to":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","subject":"Hi","content":"Hi","time":"2017-08-02T09:53:38.321","isRead":false},{"id":"k_ca0fee41-8aa1-4c6d-a859-81366a71b4c0","by":"Z_2CDDA688_13D9_4C4D_A865_6DE9F66374E5PRAPTHI_AEIONE_GMAIL_COM","to":"J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM","subject":"Hi","content":"Hi","time":"2017-08-02T09:54:50.285","isRead":false}]}}');

  }

}
