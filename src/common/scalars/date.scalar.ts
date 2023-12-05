import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

//DateScalar 클래스를 정의합니다. 이 클래스는 CustomScalar<number, Date> 인터페이스를 구현합니다.
//@Scalar('Date', type => Date는 해당 스칼라 타입이 실제로 Javascript의 Date 객체로 매핑되도록 지정합니다);
@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  // 스칼라 타입에 대한 설명을 제공합니다.
  description = 'Date custom scalar type';

  //parseValue 메소드는 클라이언트에서 받은 값(number)을 Date 객체로 변환하여 반환합니다.
  parseValue(value: number): Date {
    return new Date(value);
  }

  //serialize 메소드는 서버에서 클라이언트로 전송할 값을 (Date 객체) number로 변환하여 반환합니다.
  serialize(value: Date): number {
    return value.getTime();
  }
  // parseLiteral 메소드는 GraphQL 쿼리에서 리터럴 값을 (ValueNode) 받아서 Date 객체로 변환하여 반환합니다. 이때 , 리터럴 값의 종류(ast.kind) 가 Kind.INT 인 경우에만 변환 작업을 수행한다.
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
