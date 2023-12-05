import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

//LoggingPlugin 클래스를 정의, 이 클래스는 ApolloServerPlugin 인터페이스를 구현
//@Plugin()은 LogginPlugin 클래스가 NestJS의 Apollo 플러그인으로 사용될 수 있도록 설정합니다.
@Plugin()
export class LogginPlugin implements ApolloServerPlugin {
  //requestDidStart메소드를 구현 GraphQL요청이 시작될 때 호출되는 함수 반환
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    console.log('Request started');
    return {
      //반환되는 객체 willSendResponse 메소드가 정의, 이 메소드는 GraphQL응답을 보내기 직전에 호출된다.
      async willSendResponse() {
        console.log('Will send response');
      },
    };
  }
}
