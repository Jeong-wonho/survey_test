import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

// ComplextityPlugin 클래스를 정의한다. 이 클래스는 ApolloServerPlugin 인터페이스르 구현한다.
//@Plugin은 ComplexityPlugin 클래스가 Nestjs의 Apollo 플러그인으로 사용될 수 있도록 설정한다.
@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  // GraphQLSchemaHost를 주입받는다.
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  // requestDidStart 메소들르 구현하여 GraphQL 요청이 시작될 때 호출되는 함수를 변환한다.
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const { schema } = this.gqlSchemaHost;

    return {
      // didResolveOperation은 요청이 해결되었을 때 호출되는 함수.
      async didResolveOperation({ request, document }) {
        // getComplexity 함수를 사용하여 쿼리의 복잡도를 계산합니다.
        const complexity = getComplexity({
          // schma, operationName, query, variables 등을 인자로 전달 복잡도를 계산한다.
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          // estimators 배열에는 복잡도 계산에 사용되는 추정기(estimator) 함수들이 포함됩니다.
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        //계산된 복잡도가 20 이상인 경우, GraphQLError를 throw하여 쿼리가 너무 복잡하다는 에러를 발생시킵니다.
        if (complexity >= 20) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Miximum allowed complexity: 20`,
          );
        }
        // 계산된 복잡도를 콘솔에 출력합니다.
        console.log('Query Complextity:', complexity);
      },
    };
  }
}
