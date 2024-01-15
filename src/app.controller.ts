import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostEntity } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  async postUser() {
    // return this.userRepository.save({
    //   // title: 'test title',
    //   // role: Role.ADMIN,
    // });

    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@naver.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      where: {
        // 아닌 경우 가져오기
        // id: Not(1),
        // 적은 경우 가져오기
        // id: LessThan(30),
        // 적은경우 같은경우
        // id: LessThanOrEqual(30),
        // id: MoreThan(30),
        // id: MoreThanOrEqual(30),
        // 같은 경우
        // id: Equal(30),
        // 유사값, 소문자 대문자 구분함.
        // email: Like('%0%'),
        // 소문자 대문자 구분안함.
        // email: ILike('%NAVER%'),
        // 사잇값
        // id: Between(10, 15),
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 6]),
        // id 가 null인 경우
        // id: IsNull(),
      },

      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약 select를 정의하지 않으면 모든 프로퍼티를 가져온다.
      // select를 정의하면 정의된 프로퍼티들만 가져온다.
      // select: {
      //   // id: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      // 필터링할 조건을 입력하게 된다. (** and 조건으로 묶인다 **)
      // where: {
      //   version: 1,
      //   id: 3,
      // },
      // (** or 조건으로 묶이게 하려면 **)
      // where: [{ id: 1 }, { version: 1 }],
      // 관계를 가져오는법
      // relations: {
      //   profile: true,
      // },
      // 오름차 내림차
      // ASC -> 오름차
      // DESC -> 내림차
      order: {
        id: 'asc',
      },
      // 처음 몇개를 제외할지,
      // skip: 0,
      // 테이블에서 몇개를 가져올지, 0은 모두 가져온다., 처음부터 몇개를 가져올지
      // take: 2,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
      // title: user.title + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete({
      id: +id,
    });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'mansldkf@naver.com',
      profile: {
        profileImg: 'adsadf.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asd.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@navver.com',
    });

    const post = await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post = await this.postRepository.save({
      title: 'Nest Js',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming',
    });

    const tag = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post2],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJs Lecture',
      tags: [tag, tag2],
    });

    return true;
  }

  @Get('posts')
  async getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('Tags')
  async getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  // 흔히 사용되는 메서드
  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - **저장은 안함**
    // const user1 = this.userRepository.create({
    //   email: 'test@naver.com',
    // });
    //
    // // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // **저장하지 않음.**
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'codefactory@slkdfjsdklfjsdflk',
    // });

    // 삭제
    // await this.userRepository.delete(101);

    // 해당 프로퍼티를 증가시킴
    // await this.userRepository.increment(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   2,
    // );

    // 값을 감소시킴
    // await this.userRepository.decrement(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   1,
    // );

    // 개수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // sum
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // max
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });
    // // min
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // const all = await this.userRepository.find();

    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    // 페지네이션 pagination, 전체에 해당되는 개수도 반환해줌
    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 3,
    // });

    return usersAndCount;
  }
}
