import { describe, expect, it } from 'vitest';
import { MODEL_LIMIT_NOTICE, PRIVACY_NOTICE, SOCIAL_SAFETY_NOTICE } from './learnerCopy';

describe('fictional learning content', () => {
  it('states model, privacy, and social boundaries', () => {
    expect(MODEL_LIMIT_NOTICE).toContain('교육용 상대 단위');
    expect(MODEL_LIMIT_NOTICE).toContain('실제 도시계획');
    expect(MODEL_LIMIT_NOTICE).toContain('응급 서비스 성능을 예측하지 않습니다');
    expect(PRIVACY_NOTICE).toContain('이름, 학교, 집 주소, 실제 지역은 입력하지 마세요');
    expect(SOCIAL_SAFETY_NOTICE).toContain('개인의 잘못이 아닙니다');
  });
});
