import { AxiosApi } from 'request/AxiosBase';

interface IAxiosSendGroupCreatedEmailProps {
  userId: string;
  groupId: string;
}

const AxiosSendGroupCreatedEmail = async (
  props: IAxiosSendGroupCreatedEmailProps
) => {
  try {
    const result = await AxiosApi.post('/emails/sendGroupCreatedEmail', props);

    if (result.status == 204) return null;

    return result.data;
  } catch (error) {
    console.error('AxiosSendGroupCreatedEmail Error:', error);

    if (error instanceof Error) return error;

    return new Error(`Error al ejecutar AxiosSendGroupCreatedEmail: ${error}`);
  }
};

export default AxiosSendGroupCreatedEmail;
